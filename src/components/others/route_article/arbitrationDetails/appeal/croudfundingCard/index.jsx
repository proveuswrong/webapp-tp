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
      <Radio value={rulingOption} className={styles.radioButton}>
        {title}
      </Radio>
      <EtherValue value={totalToBeRaised} modifiers={styles.ethValue} />
      <Tooltip
        placement="top"
        title={`Raised so far: ${formatToEther(raisedSoFar)} ${
          constants.EtherSymbol
        } / Your contribution: ${formatToEther(amount)} ${constants.EtherSymbol}`}
      >
        <div className={styles.indicator}>
          <ProgressBar
            percent={getPercentage(raisedSoFar, totalToBeRaised)}
            success={{
              percent: getPercentage(amount, totalToBeRaised),
            }}
          />
        </div>
      </Tooltip>
      <div className={styles.appealDeadline}>
        Appeal ends in: <span>{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
}

const getPercentage = (amount, total) => {
  amount = BigNumber.from(amount);
  total = BigNumber.from(total);
  return amount.mul(100).div(total).toNumber();
};
