import {Progress, Radio} from "antd";
import {constants, utils} from "ethers";
import {useState} from "react";
import Timeline from "../../../components/ui/timeline";
import * as styles from "./index.module.scss";

const ITEMS = [
  {
    title: "Evidence",
    description: "01d 04h 23m",
  },
  {
    title: "Voting",
    description: "01d 04h 23m",
  },
  {
    title: "Appeal",
    description: "01d 04h 23m",
  },
];

export default function ArbitrationDetails(props) {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => [setCurrent(value)];

  const comnponents = [<EvidencePeriod/>, <VotingPeriod/>, <AppealPeriod/>];
  return (
    <>
      <div className={styles.title}>Arbitration Details</div>

      <div className={styles.detailsContainer}>
        <span>
          <b>Arbitrator:</b>
          TechnicalTech
        </span>
        <span>
          <b>DisputeID:</b>
          548698
        </span>
        <span>
          <b>Round Number:</b>9
        </span>
        <span>
          <b>Jury Size:</b>
          569 votes
        </span>
      </div>

      <Timeline {...{items: ITEMS, current, onChange}} />
      {comnponents[current]}
    </>
  );
}

function EvidencePeriod(props) {
  return <div>Evidence period</div>;
}

function VotingPeriod(props) {
  return <div>Voting period</div>;
}

function AppealPeriod(props) {
  const [value, setValue] = useState(1);
  const onChange = (e) => setValue(e.target.value);
  console.log({value});
  return (
    <div className={styles.appealPeriod}>
      <h1 className={styles.title}>Appeal Crowdfunding Status</h1>
      <Radio.Group name="radiogroup" onChange={onChange} value={value}>
        <div className={styles.appealOptions}>
          <div className={styles.option}>
            <span>
              <Radio value={1}>Yes</Radio>
              <EtherValue value="810000000000000000"/>
            </span>
            <Progress percent={57} success={{percent: 35}} type="line" trailColor="transparent" status="active"/>
          </div>
          <div className={styles.option}>
            <span>
              <Radio value={0}>No</Radio>
              <EtherValue value="1200000000000000000"/>
            </span>
            <Progress percent={57} success={{percent: 35}} type="line" trailColor="transparent" status="active"/>
          </div>
        </div>
      </Radio.Group>
      <div>Your contribution</div>
    </div>
  );
}

function EtherValue(props) {
  return <h2>{`${parseFloat(utils.formatUnits(props.value)).toFixed(3)} ${constants.EtherSymbol}`}</h2>;
}
