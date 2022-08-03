import React from "react";
import * as styles from "./index.module.scss";

export default function SyncStatus({latestBlock, syncedBlock}) {
  return (<div className={styles.syncStatus}>
    <small key={parseInt(syncedBlock)} style={{marginTop: "auto"}}>
      Synced to block: <span
      className="blink">{syncedBlock || 'Unable to fetch.'}</span>
    </small>
    <br/>
    <small key={parseInt(latestBlock)} style={{marginTop: "auto"}}>
      Latest block: <span
      className="blink">{latestBlock || 'Unable to fetch.'}</span>
    </small>
  </div>)
}
