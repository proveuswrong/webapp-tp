import React from "react";
import {Link} from "react-router-dom";
import * as styles from "./index.module.scss";


export default function ListClaimsItem({title, description, score, createdAt, children, linkTo}) {
  return <Link className={styles.listClaimsItem} to={linkTo}>
    <div className={styles.trustScore}><span>Trust Score: <span key={title + score} className='blink'>{score}</span> </span>
      <span className={styles.children}>{children}</span>
    </div>

    <div className={styles.title}>{title}
    </div>

    <div className={styles.description}>{description?.split(' ').slice(0, 20).join(' ').concat('...')}</div>
    <div className={styles.createdAt}>{new Date(parseInt(createdAt) * 1000).toUTCString()}</div>

  </Link>
    ;
}
