import * as styles from "./index.module.scss";
import { Steps } from "antd";

export default function Timeline(props) {
  const { items, current, onChange } = props;

  return (
    <div className={`${styles.timelineSteps}`}>
      <Steps current={current} onChange={onChange} labelPlacement="vertical">
        {items.map((item, index) => (
          <Steps.Step title={item.title} key={index} description={item.description} />
        ))}
      </Steps>
    </div>
  );
}
