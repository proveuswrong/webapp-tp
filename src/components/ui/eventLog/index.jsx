import React, {useContext} from "react";
import * as styles from "./index.module.scss";
import Modal from '../modal';
import {ethers} from "ethers";
import {getLabel} from "../../../utils/account";
import {chains, EthereumContext} from "../../../data/ethereumProvider";


function getPrettyNamesForEvents(sourceCodeName) {
  switch (sourceCodeName) {
    case 'NewClaim':
      return 'New Article'
    case 'BalanceUpdate':
      return 'Bounty Increase'
    case 'Ruling':
      return 'Arbitrator Ruling'
    default:
      return sourceCodeName;
  }
}

export default function EventLog({visible, onCancel, events, activeAddress}) {
  const ethereumContext = useContext(EthereumContext);


  return <Modal visible={visible} className={styles.eventLog} onCancel={onCancel} footer={null}>
    <div className={styles.title}>Event Log</div>
    <table>
      <tr>
        {Object.keys(events[0]).map((header, j) => <th className={styles.tableHeader} key={`header${j}`}>{header}</th>)}
      </tr>
      {events.map((event, i) =>
        <tr key={`row${i}`}>
          {Object.values(event).map((column, j) => <td
            key={`col${j}`}>{ethers.utils.isAddress(column) ?
            <a href={chains[ethereumContext?.chainId].explorerURL(column)} target="_blank"
               rel="noreferrer noopener">{getLabel(column, activeAddress)}</a> : getPrettyNamesForEvents(column)}</td>)}
        </tr>
      )}
    </table>
  </Modal>
}
