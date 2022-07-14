import React  from "react";
import * as styles from "./index.module.scss";

export default function Pill(props) {
  return <span className={`${styles.pill} ${props.children.toLowerCase()}`}>{props.children}</span>;
}
