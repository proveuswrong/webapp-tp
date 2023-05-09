import { Breadcrumb as BreadcrumbAntDesign } from "antd";
import { Link } from "react-router-dom";
import * as styles from "./index.module.scss";

export default function Breadcrumb({ items }) {
  return (
    <div className={styles.breadcrumb}>
      <BreadcrumbAntDesign>
        {items?.map((item, index) => {
          if (!item.label) return null;
          const isLast = index === items.length - 1;
          return (
            <BreadcrumbAntDesign.Item key={index} className={isLast && "active"}>
              {isLast || !item.linkTo ? item.label : <Link to={`/${item.linkTo}`}>{item.label}</Link>}
            </BreadcrumbAntDesign.Item>
          );
        })}
      </BreadcrumbAntDesign>
    </div>
  );
}
