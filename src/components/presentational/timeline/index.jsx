import * as styles from "./index.module.scss";
import { Steps } from "antd";

export default function Timeline(props) {
  const { items, current, completed } = props;

  return (
    <div className={`${styles.timelineSteps}`}>
      <Steps current={current} labelPlacement="vertical">
        {items.map((item, _index) => (
          <Steps.Step title={item.title} key={_index} description={item.description} status={completed && "finish"} />
        ))}
      </Steps>
    </div>
  );
}
