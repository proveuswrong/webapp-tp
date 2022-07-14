import React  from "react";
import * as styles from "./index.module.scss";
import { Tooltip as  TooltipFromAntDesign } from "antd";

export default function Tooltip(props) {
  return <TooltipFromAntDesign {...props} className={styles.tooltip}>{props.children}</TooltipFromAntDesign>;
}
