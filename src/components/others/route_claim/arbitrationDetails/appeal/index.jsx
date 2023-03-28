import { useState } from "react";
import { constants, utils } from "ethers";
import { Radio } from "antd";
import * as styles from "./index.module.scss";

import ProgressBar from "/src/components/presentational/progressBar";

export default function AppealPeriod(props) {
  const [value, setValue] = useState(1);
  const onChange = (e) => setValue(e.target.value);
  return (
    <div className={styles.appealPeriod}>
      <h1 className={styles.title}>Appeal Crowdfunding Status</h1>
      <Radio.Group name="radiogroup" onChange={onChange} value={value}>
        <div className={styles.appealOptions}>
          <div className={styles.option}>
            <div className={styles.topRow}>
              <Radio value={1}>Yes</Radio>
              <EtherValue value="810000000000000000" />
            </div>
            <ProgressBar percent={57} success={{ percent: 57 }} />
          </div>
          <div className={styles.option}>
            <div className={styles.topRow}>
              <Radio value={0}>No</Radio>
              <EtherValue value="1200000000000000000" />
            </div>
            <ProgressBar percent={57} success={{ percent: 35 }} />
          </div>
        </div>
      </Radio.Group>
      <div className={styles.label}>
        <div className={styles.colorBox} /> Your contribution
      </div>
    </div>
  );
}

function EtherValue(props) {
  return <h2>{`${parseFloat(utils.formatUnits(props.value)).toFixed(3)} ${constants.EtherSymbol}`}</h2>;
}
