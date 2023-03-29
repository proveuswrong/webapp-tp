import {useEffect, useState} from "react";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import DisputeTimeline from "/src/components/others/disputeTimeline";

import {getCourtIdAndJurySize, currentJurySize} from "/src/utils/getCourtIdAndJurorSize";
import usePolicy from "/src/hooks/usePolicy";
import {Periods} from "/src/constants/enums";

import AppealPeriod from "./appeal";


export default function ArbitrationDetails({claim}) {
  const currentDispute = claim?.disputes.slice(-1)[0];
  
  const [current, setCurrent] = useState(0);
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(currentDispute?.period ?? 0);

  const {initialJurySize} = getCourtIdAndJurySize(claim?.arbitratorExtraData);

  const policy = usePolicy(currentDispute?.court?.policy);

  // TODO: Mimics the state progress of Period. Replace with contract call
  const handleAdvanceState = () => {
    setCurrentPeriodIndex((prev) => (prev + 1) % 4);
  };

  useEffect(() => {
    const updatedCurrent = currentPeriodToItemIndex(currentPeriodIndex);
    setCurrent(updatedCurrent);
  }, [currentPeriodIndex]);

  console.log({currentPeriodIndex});
  console.log({current});

  const components = [<EvidencePeriod/>, <VotingPeriod/>, <AppealPeriod/>];
  return (
    <>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Arbitration Details</div>
        <CustomButton modifiers="small" onClick={() => handleAdvanceState()}>
          Advance state
        </CustomButton>
      </div>
      <Overview courtName={policy.name} disputeID={currentDispute?.id} roundNumber={9} jurySize={currentJurySize(initialJurySize, 2)}/>
      <DisputeTimeline dispute={currentDispute} currentPeriodIndex={currentPeriodIndex} current={current}/>
      {components[current]}
    </>
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
