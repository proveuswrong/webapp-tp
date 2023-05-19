import React from "react";
import * as styles from "./index.module.scss";

export default function InformationBox({ children }) {
  return <div className={styles.infoBox}>{children}</div>;
}
