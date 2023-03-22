import React  from "react";
import * as styles from "./index.module.scss";

export default function Tag(props) {
  return <span className={`${styles.tag}`}>{props.children}</span>;
}
