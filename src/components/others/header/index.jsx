import { useContext, useEffect, useRef, useState } from "react";
import * as styles from "./index.module.scss";

import TruthPost from "jsx:/src/assets/tp.svg";
import useScrollLock from "../../../hooks/useScrollLock";

export default function Header() {
  return (
      <header className={`${styles.header}`}>
        <div className={styles.logoContainer}>
          <TruthPost  />
        </div>
        <div className={styles.subtitleContainer}>
          <div className={styles.subtitle}>Accurate and Relevant News</div>
          <hr />
          <div className={styles.subtitleDate}>{new Date().toUTCString().slice(0, 16)}</div>
        </div>
      </header>
  );
}
