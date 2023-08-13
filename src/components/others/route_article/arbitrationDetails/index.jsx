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

import { KLiquidAbi as ArbitratorABI } from "../../../../data/KlerosLiquidABI";
import usePolicy from "/src/hooks/usePolicy";
import { Periods } from "/src/constants/enums";
import { EthereumContext } from "../../../../data/ethereumContext";
import { networkMap } from "../../../../connectors/networks";
import { useSession } from "../../../../data/sessionContext";

export default function ArbitrationDetails({ article }) {
  const currentDispute = article?.disputes?.at(-1);
  const currentPeriodIndex = Periods[currentDispute?.period] ?? 0;
  const session = useSession();
  const { state, metaEvidenceContents } = useContext(EthereumContext);
  const [isEvidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [current, setCurrent] = useState(currentPeriodIndex);
  const [buttonAdvanceStateDisabled, setButtonAdvanceStateDisabled] = useState(false);
  const [mined, setMined] = useState(true);
  const revalidator = useRevalidator();

  const policy = usePolicy(currentDispute?.court?.policyURI);
  const handleAdvanceState = () => {
    // Blindly iterates, since we don't know the state of arbitrator yet. To be upgraded when Subgraph provides those info.
    setButtonAdvanceStateDisabled(true);

    executeRuling();
  };

  //TODO: extract Arbitration state logic to a separate hook
  const executeRuling = async () => {
    try {
      setMined(false);
      await session.invokeTransaction("executeRuling", [currentDispute?.id], {
        contractAddress: article.arbitrator.id,
        abi: ArbitratorABI,
      });
      setMined(true);
      setButtonAdvanceStateDisabled(false);
    } catch (error) {
      await passPeriod();
    }
  };

  const passPeriod = async () => {
    // prerequisite: jury drawn
    try {
      setMined(false);
      await session.invokeTransaction("passPeriod", [currentDispute?.id], {
        contractAddress: article.arbitrator.id,
        abi: ArbitratorABI,
      });

      setMined(true);
      setButtonAdvanceStateDisabled(false);
      revalidator.revalidate();
    } catch (error) {
      await drawJury();
    }
  };

  const drawJury = async (completedCallback, minedCallback) => {
    // prerequisite: phase = drawing && nextDelayedSetStake > lastDelayedSetStake
    try {
      setMined(false);
      await session.invokeTransaction("drawJurors", [currentDispute?.id, 1000], {
        contractAddress: article.arbitrator.id,
        abi: ArbitratorABI,
      });

      setMined(true);
      setButtonAdvanceStateDisabled(false);
    } catch (error) {
      await executeDelayedSetStake(completedCallback, minedCallback);
    }
  };

  const executeDelayedSetStake = async (completedCallback, minedCallback) => {
    // prerequisite: phase = staking
    try {
      setMined(false);
      await session.invokeTransaction("drawJurors", [currentDispute?.id, 1000], {
        contractAddress: article.arbitrator.id,
        abi: ArbitratorABI,
      });

      setMined(true);
      setButtonAdvanceStateDisabled(false);
    } catch (error) {
      await passPhase(completedCallback, minedCallback);
    }
  };

  const passPhase = async (completedCallback, minedCallback) => {
    // prerequisite: (phase = staking && disputesWithoutJurors > 0), now - lastPhaseChange >= minStakingTime
    try {
      setMined(false);
      await session.invokeTransaction("passPhase", [], {
        contractAddress: article.arbitrator.id,
        abi: ArbitratorABI,
      });

      setMined(true);
      setButtonAdvanceStateDisabled(false);
    } catch (error) {
    } finally {
      setButtonAdvanceStateDisabled(false);
    }
  };

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
      question={metaEvidenceContents[article?.category]?.question}
      voteOptions={metaEvidenceContents[article.category]?.rulingOptions.titles}
    />,
    <AppealPeriod currentRound={currentDispute?.rounds.at(-1)} setEvidenceModalOpen={setEvidenceModalOpen} />,
    <ExecutionPeriod
      currentRound={currentDispute?.rounds.at(-1)}
      executed={!!currentDispute?.ruled}
      arbitratorAddress={article.arbitrator.id}
      setEvidenceModalOpen={setEvidenceModalOpen}
    />,
  ];
  return (
    <section className={styles.arbitrationDetails}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Arbitration Details</div>
        {networkMap[state.appChainId].shortname !== "Mainnet" && (
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
        {/* TODO: convert to dynamic link */}
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
