import { useEffect, useState } from "react";
import * as styles from "./index.module.scss";

import SyncStatus from "/src/components/presentational/syncStatus";

import NetworkWarningIcon from "jsx:/src/assets/networkWarning.svg";
import { useConnection, useEthereum } from "../../../data/ethereumContext";
import Popover from "../../presentational/popover";

const NETWORK_STATUS = {
  synced: "synced",
  syncing: "syncing",
  timeout: "timeout",
};

const STATUS_COLOR = {
  [NETWORK_STATUS.synced]: "#69da4d",
  [NETWORK_STATUS.syncing]: "#ebaf41",
  [NETWORK_STATUS.timeout]: "#eb4141",
};

export default function NetworkStatus() {
  const { state, graphMetadata } = useEthereum();
  const connection = useConnection();
  const status = useNetworkSyncStatus();

  const content = (
    <SyncStatus
      syncedBlock={graphMetadata?.block?.number}
      latestBlock={parseInt(state.blockNumber, 16)}
      subgraphDeployment={graphMetadata?.deployment}
      providerURL={connection.currentConnector.name}
    />
  );
  return (
    <div className={styles.networkStatus}>
      <Popover content={content} title="Sync Status" trigger="hover">
        <div className={`${styles.indicator} blink`}>
          <NetworkWarningIcon style={{ fill: STATUS_COLOR[status], stroke: STATUS_COLOR[status] }} />
          {status}
        </div>
      </Popover>
    </div>
  );
}

const useNetworkSyncStatus = () => {
  const [status, setStatus] = useState(NETWORK_STATUS.syncing);
  const { state, graphMetadata } = useEthereum();

  /*   useEffect(() => {
    if (state.appChainId !== state.chainId && state.account !== "0x0") setStatus(NETWORK_STATUS.timeout);
  }, [state.appChainId, state.chainId, state.blockNumber, graphMetadata.block.number]); */

  return status;
};
