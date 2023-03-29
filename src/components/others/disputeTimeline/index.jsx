import Timeline from "../../presentational/timeline";
import useCountdown, {formatTime} from "/src/hooks/useCountdown";
import getDisputePeriodDeadline from "/src/businessLogic/getDisputePeriodDeadline";

const ITEM_TITLES = ["Evidence", "Vote", "Appeal"];

export default function DisputeTimeline({dispute, currentPeriodIndex, current}) {
  const deadline = getDisputePeriodDeadline(
    currentPeriodIndex,
    dispute?.lastPeriodChange,
    [6900300, 9650300, 9650300, 9750300]
  ); // currentDispute?.court?.timesPerPeriod);
  const timeLeft = useCountdown(deadline);

  const items = ITEM_TITLES.map((title, _index) => ({
    title,
    description: _index === current ? formatTime(timeLeft) : "",
  }));

  return (
    <>
      <div>
        <p>Time left until deadline:</p>
        <p>{formatTime(timeLeft)}</p>
      </div>
      <Timeline items={items} current={current}/>
    </>
  );
}
