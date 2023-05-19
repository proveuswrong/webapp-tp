import { Pagination as PaginationAntDesign } from "antd";
import * as styles from "./index.module.scss";

export default function Pagination({ current, pageSize, total, onChange }) {
  return (
    <PaginationAntDesign
      className={styles.pagination}
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      hideOnSinglePage
    />
  );
}
