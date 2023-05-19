import * as styles from "./index.module.scss";

export default function Loader({ children, fallback, isLoading }) {
  if (isLoading) return <div className={styles.loader}>{fallback}</div>;
  return children;
}
