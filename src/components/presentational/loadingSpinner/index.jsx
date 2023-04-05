import * as styles from "./index.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner} />
    </div>
  );
}
