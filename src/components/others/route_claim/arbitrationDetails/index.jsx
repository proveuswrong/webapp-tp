import {useContext, useEffect, useState} from "react";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import DisputeTimeline from "/src/components/others/disputeTimeline";

import {getCourtIdAndJurySize, currentJurySize} from "/src/utils/getCourtIdAndJurorSize";
import usePolicy from "/src/hooks/usePolicy";
import {Periods} from "/src/constants/enums";

import AppealPeriod from "./appeal";
import {ethers} from "ethers";
import ArbitratorABI from "../../../../data/klerosLiquidABI.json";
import {EthereumContext, networkMap} from "../../../../data/ethereumProvider";

const ARBITRATOR_ADDRESS = "0x1128eD55ab2d796fa92D2F8E1f336d745354a77A"
// TODO: This info should come from subgraph, within claim object.
export default function ArbitrationDetails({claim}) {
  const currentDispute = claim?.disputes.slice(-1)[0];

  const ethereumContext = useContext(EthereumContext);


  const [current, setCurrent] = useState(0);
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(currentDispute?.period ?? 0);
  const [buttonAdvanceStateDisabled, setButtonAdvanceStateDisabled] = useState(false)
  const [mined, setMined] = useState(true)

  const {initialJurySize} = getCourtIdAndJurySize(claim?.arbitratorExtraData);
  const [arbitratorInstance, setArbitratorInstance] = useState(null)


  const policy = usePolicy(currentDispute?.court?.policy);


  const handleAdvanceState = () => {
    // Blindly iterates, since we don't know the state of arbitrator yet. To be upgraded when Subgraph provides those info.
    setButtonAdvanceStateDisabled(true)

    executeRuling()
  }

  const executeRuling = async () => {
    // prerequisite: last period
    const unsignedTx = await arbitratorInstance.populateTransaction.executeRuling(currentDispute?.id);
    let txResponse
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false)
      const txReceipt = await txResponse.wait()
      setMined(true)
      setButtonAdvanceStateDisabled(false)


    } catch (error) {
      await passPeriod()
    }
  }

  const passPeriod = async () => {
    // prerequisite: jury drawn
    const unsignedTx = await arbitratorInstance.populateTransaction.passPeriod(currentDispute?.id);
    let txResponse
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false)
      const txReceipt = await txResponse.wait()
      setMined(true)
      setButtonAdvanceStateDisabled(false)


    } catch (error) {
      await drawJury()
    }
  }

  const drawJury = async (completedCallback, minedCallback) => {
    // prerequisite: phase = drawing && nextDelayedSetStake > lastDelayedSetStake

    const unsignedTx = await arbitratorInstance.populateTransaction.drawJurors(currentDispute?.id, 1000);
    let txResponse
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false)
      const txReceipt = await txResponse.wait()
      setMined(true)
      setButtonAdvanceStateDisabled(false)

    } catch (error) {
      await executeDelayedSetStake(completedCallback, minedCallback)
    }
  }

  const executeDelayedSetStake = async (completedCallback, minedCallback) => {
    // prerequisite: phase = staking

    const unsignedTx = await arbitratorInstance.populateTransaction.drawJurors(currentDispute?.id, 1000);
    let txResponse
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false)
      const txReceipt = await txResponse.wait()
      setMined(true)
      setButtonAdvanceStateDisabled(false)


    } catch (error) {
      await passPhase(completedCallback, minedCallback)
    }
  }

  const passPhase = async (completedCallback, minedCallback) => {
    // prerequisite: (phase = staking && disputesWithoutJurors > 0), now - lastPhaseChange >= minStakingTime

    const unsignedTx = await arbitratorInstance.populateTransaction.passPhase();
    let txResponse
    try {
      txResponse = await ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx);
      setMined(false)
      const txReceipt = await txResponse.wait()
      setMined(true)
      setButtonAdvanceStateDisabled(false)


    } catch (error) {
    } finally {
      setButtonAdvanceStateDisabled(false)
    }
  }


  useEffect(() => {
    setArbitratorInstance(new ethers.Contract(ARBITRATOR_ADDRESS, ArbitratorABI, ethereumContext?.ethersProvider?.getSigner()))
  }, [ethereumContext?.ethersProvider])

  useEffect(() => {
    const updatedCurrent = currentPeriodToItemIndex(currentPeriodIndex);
    setCurrent(updatedCurrent);
  }, [currentPeriodIndex]);


  const components = [<EvidencePeriod/>, <VotingPeriod/>, <AppealPeriod/>];
  return (
    <section className={styles.arbitrationDetails}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Arbitration Details</div>
        <CustomButton modifiers="small" disabled={buttonAdvanceStateDisabled} onClick={() => handleAdvanceState()}>
          {mined ? `Advance state` : `Mining...`}
        </CustomButton>
      </div>
      <Overview courtName={policy.name} disputeID={currentDispute?.id} roundNumber={9} jurySize={currentJurySize(initialJurySize, 2)}/>
      <DisputeTimeline dispute={currentDispute} currentPeriodIndex={currentPeriodIndex} current={current}/>
      {components[current]}
    </section>
  );
}

function currentPeriodToItemIndex(currentPeriodIndex) {
  if ([Periods.vote, Periods.appeal, Periods.execution].includes(currentPeriodIndex)) return currentPeriodIndex - 1;
  return currentPeriodIndex;
}

function Overview(props) {
  return (
    <div className={styles.detailsContainer}>
      <span>
        <b>Arbitrator:</b>
        {props.courtName}
      </span>
      <span>
        <b>DisputeID:</b>
        {props.disputeID ?? "None"}
      </span>
      <span>
        <b>Round Number:</b>
        {props.roundNumber}
      </span>
      <span>
        <b>Jury Size:</b>
        {props.jurySize} votes
      </span>
    </div>
  );
}

function EvidencePeriod(props) {
  return <div>Evidence period</div>;
}

function VotingPeriod(props) {
  return <div>Voting period</div>;
}