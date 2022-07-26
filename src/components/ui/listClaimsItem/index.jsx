import React  from "react";
import { Link} from "react-router-dom";
import * as styles from "./index.module.scss";


export default function ListClaimsItem({title, score, createdAt, children, linkTo}) {
  return <div className={styles.listClaimsItem}>
    <div className={styles.trustScore}>Trust Score: {score}</div>

    <div className={styles.containerTitle}> <Link to={linkTo}><span className={styles.title}>{title}</span>
    </Link>
    {children}
    </div>
    <div className={styles.createdAt}>{createdAt}</div>
  </div>;
}
