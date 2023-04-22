import * as styles from "./index.module.scss";

export default function LazyLoader({ children, fallback, isLoading }) {
  if (isLoading) return <div className={styles.lazyLoader}>{fallback}</div>;
  return children;
}
