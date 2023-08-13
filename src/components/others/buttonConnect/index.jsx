import React, { useState } from "react";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import Modal from "../../presentational/modal";

import { useConnection, useEthereum } from "../../../data/ethereumContext";
import { getShortAddress } from "../../../utils/account";
import { networkMap } from "../../../connectors/networks";

export default function ButtonConnect() {
  const { state } = useEthereum();
  const connection = useConnection();
  const [isVisible, setVisible] = useState(false);

  console.log("state/status", state.status);
  console.log("connector", connection.currentConnector.name);

  return (
    <>
      <CustomButton modifiers="small secondary" id="buttonConnect" onClick={() => setVisible(true)}>
        {state.status === "connected" ? getShortAddress(state.account) : "Connect"}
      </CustomButton>
      <Modal visible={isVisible} modifiers={styles.connectionModal} onCancel={() => setVisible(false)} footer={null}>
        {state.status === "connected" ? <AccountInfo /> : <ConnectOptionDisplay />}
      </Modal>
    </>
  );
}

const ConnectOptionDisplay = () => {
  const connection = useConnection();

  const activate = async (connectorName) => {
    if (connection.currentConnector.name !== connectorName) await connection.switchConnector(connectorName);
    else await connection.enable(connectorName);
  };
  return (
    <div className={styles.connectOptions}>
      <div className={styles.title}>Connect a wallet</div>
      <div className={styles.subtitle}>Connect wallet in one click to start interaction with TruthPost</div>
      <div className={styles.connectors}>
        {connection.availableConnectors.map((c) => (
          <div key={c.name} className={styles.connectorCard} onClick={() => activate(c.name)}>
            <div>
              <img src={c.icon} alt={c.name} />
            </div>
            <div>{c.name}</div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        New to Web3?
        <a href="https://ethereum.org/en/wallets/" target="_blank">
          Learn more about Ethereum wallets
        </a>{" "}
      </div>
    </div>
  );
};

const AccountInfo = () => {
  const { state } = useEthereum();
  const connection = useConnection();

  const discconnect = async () => {
    console.log("disconnected!");
    await connection.disable();
  };

  return (
    <div className={styles.accountInfo}>
      <h4>{getShortAddress(state.account)}</h4>
      <div>{connection.currentConnector.name}</div>
      <div className={styles.actions}>
        <div className={styles.copyAddress} onClick={() => copyToClipboard(state.account)}>
          Copy address <span />
        </div>
        <a
          className={styles.viewOnExplorer}
          href={networkMap[state.appChainId].explorerURL(state.account)}
          target="_blank"
        >
          View on Etherscan <span></span>
        </a>
      </div>

      <button onClick={() => discconnect()}>Disconnect</button>
    </div>
  );
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};
