import React from "react";
import * as styles from "./index.module.scss";

export default function Pill(props) {
  return <span className={`${styles.pill} ${props?.modifiers} ${props.children?.toLowerCase()}`}>{props.children?.replace(/([A-Z])/g, ' $1')
    .replace(/^./, function (str) {
      return str.toUpperCase();
    })}</span>;
}
