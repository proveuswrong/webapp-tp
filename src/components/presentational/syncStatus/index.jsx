import React from "react";
import * as styles from "./index.module.scss";
import {capitalize} from "../../../utils/string";

export default function SyncStatus({providerURL, latestBlock, syncedBlock, subgraphDeployment}) {
  return (<div className={styles.syncStatus}>
    {providerURL ? <small style={{marginTop: "auto"}}>
      Latest block by Web3 provider from <span className="blink">{capitalize(providerURL)}</span>: <span
      key={'last' + parseInt(latestBlock)}
      className="blink">{latestBlock || 'Unable to fetch.'}</span>
    </small> : <small>No Web3 provider available.</small>}
    <br/>
    <small key={'sync' + parseInt(syncedBlock)} style={{marginTop: "auto"}}>
      Subgraph synced to block: <span
      className="blink">{syncedBlock || 'Unable to fetch.'}</span>
    </small>
    <br/>
    <small key={subgraphDeployment} style={{marginTop: "auto"}}>
      Subgraph deployment: <span
      className="blink">{"...".concat(subgraphDeployment?.slice(-6)) || 'Unable to fetch.'}</span>
    </small>
  </div>)
}
