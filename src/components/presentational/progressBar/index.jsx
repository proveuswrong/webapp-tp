import { Progress } from "antd";
import * as styles from "./index.module.scss";

export default function ProgressBar(props) {
  return <Progress className={styles.progressBar} type="line" trailColor="transparent" status="active" {...props} />;
}
