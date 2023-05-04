import Timeline from "../../presentational/timeline";
import useCountdown, { formatTime } from "/src/hooks/useCountdown";
import getDisputePeriodDeadline from "/src/businessLogic/getDisputePeriodDeadline";

const DISPUTE_PERIODS = ["Evidence", "Commit", "Voting", "Appeal", "Execution"];

export default function DisputeTimeline({ dispute, currentPeriodIndex, current }) {
  const deadline = getDisputePeriodDeadline(
    currentPeriodIndex,
    dispute?.lastPeriodChange,
    dispute?.court?.timesPerPeriod
  );

  const timeLeft = useCountdown(deadline);

  const items = DISPUTE_PERIODS.map((title, _index) => ({
    title,
    description: _index === current && current < 4 ? formatTime(timeLeft) : "",
  }));

  return (
    <>
      <Timeline items={items} current={current} completed={dispute?.ruled} />
    </>
  );
}
