import * as styles from "./index.module.scss";

import TruthPost from "jsx:/src/assets/tp.svg";

export default function Header() {
  return (
      <header className={`${styles.header}`}>
        <h1>The Truth Post</h1>
        <div className={styles.subtitleContainer}>
          <div className={styles.subtitle}>Accurate and Relevant News</div>
          <hr />
          <div className={styles.subtitleDate}>{new Date().toUTCString().slice(0, 16)}</div>
        </div>
      </header>
  );
}
