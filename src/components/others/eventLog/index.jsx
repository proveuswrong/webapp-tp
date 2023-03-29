import React, {useContext} from "react";
import * as styles from "./index.module.scss";
import Modal from '../../presentational/modal';
import {constants, utils} from "ethers";
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

function formatExtraData(eventNameAsInSourceCode, extraData, ethereumContext) {
  switch (eventNameAsInSourceCode) {
    case 'NewClaim':
      return `Curation Pool 0: ${ethereumContext?.metaEvidenceContents[extraData]?.category}`
    case 'BalanceUpdate':
      return `New Bounty: ${parseFloat(utils.formatUnits(extraData)).toFixed(3)} ${constants.EtherSymbol}`
    case 'Challenge':
      return `${ethereumContext?.metaEvidenceContents[0]?.question}`
    case 'Ruling':
      return `${extraData == 0 ? "Jury was absent, refused to arbitrate, or it was a tie. Challenge failed." : ethereumContext?.metaEvidenceContents[0]?.rulingOptions.titles[extraData]}`
    default:
      return extraData;
  }
}

export default function EventLog({visible, onCancel, events, activeAddress}) {
  const ethereumContext = useContext(EthereumContext);
  console.log(ethereumContext?.chainId)

  return <Modal visible={visible} className={styles.eventLog} onCancel={onCancel} footer={null}>
    <div className={styles.title}>Event Log</div>
    <table>
      <tr>
        <th>Name</th>
        <th>Details</th>
        <th>Time</th>
        <th>Actor</th>
      </tr>

      {events.map((event, i) =>
        <tr key={`row${i}`}>
          <td>{getPrettyNamesForEvents(event.name)}</td>
          <td>{formatExtraData(event.name, event.details, ethereumContext)}</td>
          <td>{new Date(event.timestamp * 1000).toUTCString()}</td>
          <td>{<a href={chains[ethereumContext?.chainId]?.explorerURL(event.from)} target="_blank"
                  rel="noreferrer noopener">{getLabel(event.from, activeAddress)}</a>}</td>

        </tr>
      )}
    </table>
  </Modal>
}
