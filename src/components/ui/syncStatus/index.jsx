import React from "react";
import * as styles from "./index.module.scss";

export default function SyncStatus({latestBlock, syncedBlock, subgraphDeployment}) {
  return (<div className={styles.syncStatus}>
    <small key={'last' + parseInt(latestBlock)} style={{marginTop: "auto"}}>
      Latest block: <span
      className="blink">{latestBlock || 'Unable to fetch.'}</span>
    </small>
    <br/>
    <small key={'sync' + parseInt(syncedBlock)} style={{marginTop: "auto"}}>
      Synced to block: <span
      className="blink">{syncedBlock || 'Unable to fetch.'}</span>
    </small>
    <br/>
    <small key={subgraphDeployment} style={{marginTop: "auto"}}>
      Subgraph deployment: <span
      className="blink">{"...".concat(subgraphDeployment?.slice(-6)) || 'Unable to fetch.'}</span>
    </small>
  </div>)
}
