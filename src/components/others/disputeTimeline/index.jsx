import useCountdown, { formatTime } from "/src/hooks/useCountdown";
import getDisputePeriodDeadline from "/src/businessLogic/getDisputePeriodDeadline";
import { Periods } from "/src/constants/enums";

import EvidenceIcon from "jsx:/src/assets/evidence.svg";
import CommitIcon from "jsx:/src/assets/commit.svg";
import VotingIcon from "jsx:/src/assets/voting.svg";
import AppealIcon from "jsx:/src/assets/appeal.svg";
import ExecutionIcon from "jsx:/src/assets/execution.svg";
import CheckIcon from "jsx:/src/assets/checkMark.svg";
import Steps from "../../presentational/steps";
import useWindowSize from "../../../hooks/useWindowSize";

const DISPUTE_PERIODS = [
  { name: "Evidence", icon: <EvidenceIcon /> },
  { name: "Commit", icon: <CommitIcon /> },
  { name: "Voting", icon: <VotingIcon /> },
  { name: "Appeal", icon: <AppealIcon /> },
  { name: "Execution", icon: <ExecutionIcon /> },
];

export default function DisputeTimeline({ dispute, current }) {
  const deadline = getDisputePeriodDeadline(current, dispute?.lastPeriodChange, dispute?.court?.timesPerPeriod);

  const windowSize = useWindowSize();
  const isMobileView = windowSize.width <= 600;

  const timeLeft = useCountdown(deadline);
  const isExecuted = (periodName) => (periodName === "Execution") & dispute?.ruled;

  const items = DISPUTE_PERIODS.map((period, _index) => ({
    icon: _index < current || isExecuted(period.name) ? <CheckIcon /> : period.icon,
    title: period.name,
    description: _index === current && current < Periods.execution ? formatTime(timeLeft) : "",
  }));

  return (
    <Steps
      items={items}
      current={current}
      completed={dispute?.ruled}
      direction={isMobileView ? "vertical" : "horizontal"}
    />
  );
}
