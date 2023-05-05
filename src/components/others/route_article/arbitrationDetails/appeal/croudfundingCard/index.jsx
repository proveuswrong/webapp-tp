import { BigNumber, constants } from "ethers";
import { Radio, Tooltip } from "antd";
import * as styles from "./index.module.scss";

import ProgressBar from "/src/components/presentational/progressBar";
import EtherValue, { formatToEther } from "/src/components/presentational/EtherValue";
import useCountdown, { formatTime } from "/src/hooks/useCountdown";

export default function CrowdfundingCard({
  appealDeadline,
  title,
  rulingOption,
  amount,
  totalToBeRaised,
  raisedSoFar,
}) {
  const timeLeft = useCountdown(parseInt(appealDeadline));
  return (
    <div key={rulingOption} className={styles.crowdfundingCard}>
      <div className={styles.topRow}>
        <Radio value={rulingOption}>{title}</Radio>
        <EtherValue value={totalToBeRaised} modifiers={styles.ethValue} />
      </div>
      <Tooltip
        placement="top"
        title={`Raised so far: ${formatToEther(raisedSoFar)} ${
          constants.EtherSymbol
        } / Your contribution: ${formatToEther(amount)} ${constants.EtherSymbol}`}
      >
        <ProgressBar
          percent={getPercentage(raisedSoFar, totalToBeRaised)}
          success={{
            percent: getPercentage(amount, totalToBeRaised),
          }}
        />
        <div>{`Appeal ends in: ${formatTime(timeLeft)}`}</div>
      </Tooltip>
    </div>
  );
}

const getPercentage = (amount, total) => {
  amount = BigNumber.from(amount);
  total = BigNumber.from(total);
  return amount.mul(100).div(total).toNumber();
};
