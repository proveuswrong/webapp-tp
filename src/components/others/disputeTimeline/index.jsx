import Timeline from "../../presentational/timeline";
import useCountdown, { formatTime } from "/src/hooks/useCountdown";
import getDisputePeriodDeadline from "/src/businessLogic/getDisputePeriodDeadline";

const ITEM_TITLES = ["Evidence", "Vote", "Appeal"];

export default function DisputeTimeline({ dispute }) {
  const periodIndex = dispute ? Periods[dispute?.period] : 0;
  const deadline = getDisputePeriodDeadline(periodIndex, dispute?.lastPeriodChange, [7900300, 600]); // currentDispute?.court?.timesPerPeriod);
  const timeLeft = useCountdown(deadline);

  const currentItemIndex = currentPeriodToItemIndex(periodIndex);
  const items = ITEM_TITLES.map((title, _index) => ({
    title,
    description: _index === currentItemIndex ? formatTime(timeLeft) : "",
  }));
  console.log({ currentItemIndex });

  return (
    <>
      <div>
        <p>Time left until deadline:</p>
        <p>{formatTime(timeLeft)}</p>
      </div>
      <Timeline items={items} current={currentItemIndex} />
    </>
  );
}

function currentPeriodToItemIndex(currentPeriodIndex) {
  if ([Periods.vote, Periods.appeal, Periods.execution].includes(currentPeriodIndex)) return currentPeriodIndex - 1;
  return currentPeriodIndex;
}

export const Periods = Object.freeze({
  evidence: 0,
  commit: 1,
  vote: 2,
  appeal: 3,
  execution: 4,
});
