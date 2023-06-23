import { useContext, useEffect, useState } from "react";
import { Link, useParams, useRevalidator } from "react-router-dom";
import { ethers } from "ethers";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import DisputeTimeline from "/src/components/others/disputeTimeline";
import EvidenceModal from "/src/components/others/evidenceModal";

import EvidencePeriod from "./evidence";
import VotingPeriod from "./vote";
import AppealPeriod from "./appeal";
import ExecutionPeriod from "./execution";

import ArbitratorABI from "/src/data/klerosLiquidABI.json";
import { EthereumContext, networkMap } from "/src/data/ethereumProvider";
import usePolicy from "/src/hooks/usePolicy";
import { Periods } from "/src/constants/enums";

export default function ArbitrationDetails({ article }) {
  const currentDispute = article?.disputes?.at(-1);
  const currentPeriodIndex = Periods[currentDispute?.period] ?? 0;

  const ethereumContext = useContext(EthereumContext);
  const [isEvidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [current, setCurrent] = useState(currentPeriodIndex);
  const [buttonAdvanceStateDisabled, setButtonAdvanceStateDisabled] = useState(false);
  const [mined, setMined] = useState(true);
  const [arbitratorInstance, setArbitratorInstance] = useState(null);
  const revalidator = useRevalidator();
  console.log(ethereumContext.metaEvidenceContents);

  const policy = usePolicy(currentDispute?.court?.policyURI);
  const handleAdvanceState = () => {
    // Blindly iterates, since we don't know the state of arbitrator yet. To be upgraded when Subgraph provides those info.
    setButtonAdvanceStateDisabled(true);

    executeRuling();
  };

  const executeRuling = async () => {
    // prerequisite: last period
    const unsignedTx = await arbitratorInstance.populateTransaction.executeRuling(currentDispute?.id);
    let txResponse;
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false);
      await txResponse.wait();
      setMined(true);
      setButtonAdvanceStateDisabled(false);
    } catch (error) {
      await passPeriod();
    }
  };

  const passPeriod = async () => {
    // prerequisite: jury drawn
    const unsignedTx = await arbitratorInstance.populateTransaction.passPeriod(currentDispute?.id);
    let txResponse;
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false);
      await txResponse.wait();
      setMined(true);
      setButtonAdvanceStateDisabled(false);
      revalidator.revalidate();
    } catch (error) {
      await drawJury();
    }
  };

  const drawJury = async (completedCallback, minedCallback) => {
    // prerequisite: phase = drawing && nextDelayedSetStake > lastDelayedSetStake

    const unsignedTx = await arbitratorInstance.populateTransaction.drawJurors(currentDispute?.id, 1000);
    let txResponse;
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false);
      await txResponse.wait();
      setMined(true);
      setButtonAdvanceStateDisabled(false);
    } catch (error) {
      await executeDelayedSetStake(completedCallback, minedCallback);
    }
  };

  const executeDelayedSetStake = async (completedCallback, minedCallback) => {
    // prerequisite: phase = staking

    const unsignedTx = await arbitratorInstance.populateTransaction.drawJurors(currentDispute?.id, 1000);
    let txResponse;
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false);
      await txResponse.wait();
      setMined(true);
      setButtonAdvanceStateDisabled(false);
    } catch (error) {
      await passPhase(completedCallback, minedCallback);
    }
  };

  const passPhase = async (completedCallback, minedCallback) => {
    // prerequisite: (phase = staking && disputesWithoutJurors > 0), now - lastPhaseChange >= minStakingTime

    const unsignedTx = await arbitratorInstance.populateTransaction.passPhase();
    let txResponse;
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false);
      await txResponse.wait();
      setMined(true);
      setButtonAdvanceStateDisabled(false);
    } catch (error) {
    } finally {
      setButtonAdvanceStateDisabled(false);
    }
  };

  useEffect(() => {
    if (article?.arbitrator)
      setArbitratorInstance(
        new ethers.Contract(article.arbitrator.id, ArbitratorABI, ethereumContext?.ethersProvider?.getSigner())
      );
  }, [ethereumContext?.ethersProvider, article]);

  useEffect(() => {
    setCurrent(currentPeriodIndex);
  }, [currentPeriodIndex]);

  console.log({ currentDispute });
  const components = [
    <EvidencePeriod
      evidenceEvents={article?.events.filter((event) => event.name === "Evidence")}
      setEvidenceModalOpen={setEvidenceModalOpen}
    />,
    <VotingPeriod
      currentRound={currentDispute?.rounds.at(-1)}
      isHiddenVotes={currentDispute?.court.hiddenVotes}
      setEvidenceModalOpen={setEvidenceModalOpen}
    />,
    <VotingPeriod
      currentRound={currentDispute?.rounds.at(-1)}
      isHiddenVotes={currentDispute?.court.hiddenVotes}
      setEvidenceModalOpen={setEvidenceModalOpen}
      question={ethereumContext?.metaEvidenceContents[article?.category]?.question}
      voteOptions={ethereumContext.metaEvidenceContents[article.category].rulingOptions.titles}
    />,
    <AppealPeriod currentRound={currentDispute?.rounds.at(-1)} setEvidenceModalOpen={setEvidenceModalOpen} />,
    <ExecutionPeriod
      currentRound={currentDispute?.rounds.at(-1)}
      executed={!!currentDispute?.ruled}
      arbitratorInstance={arbitratorInstance}
      setEvidenceModalOpen={setEvidenceModalOpen}
    />,
  ];
  return (
    <section className={styles.arbitrationDetails}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Arbitration Details</div>
        {networkMap[ethereumContext.chainId].shortname !== "Mainnet" && (
          <CustomButton modifiers="small" disabled={buttonAdvanceStateDisabled} onClick={() => handleAdvanceState()}>
            {mined ? `Advance state` : `Mining...`}
          </CustomButton>
        )}
      </div>
      <Overview
        courtName={policy.name}
        disputeID={currentDispute?.id}
        roundNumber={currentDispute?.rounds?.length}
        jurySize={currentDispute?.rounds?.at(-1).jurySize}
      />
      <DisputeTimeline dispute={currentDispute} current={current} />
      {components[current]}
      <EvidenceModal
        disputeID={article?.disputes?.at(-1)?.id}
        visible={isEvidenceModalOpen}
        onCancel={() => setEvidenceModalOpen(false)}
      />
    </section>
  );
}

function Overview(props) {
  const { contract } = useParams();
  return (
    <div className={styles.detailsContainer}>
      <span>
        <b>Arbitrator:</b>
        <Link to={`/0x5/${contract}/court/0`}>{props.courtName}</Link>
      </span>
      <span>
        <b>DisputeID:</b>
        {props.disputeID ?? "None"}
      </span>
      <span>
        <b>Round Number:</b>
        <span key={props.roundNumber} className="blink">
          {props.roundNumber}
        </span>
      </span>
      <span>
        <b>Jury Size:</b>
        <span key={props.jurySize} className="blink">{`${props.jurySize} ${
          props.jurySize > 1 ? "votes" : "vote"
        }`}</span>
      </span>
    </div>
  );
}
