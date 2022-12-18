import React from "react";
import * as styles from "./index.module.scss";
import Modal from '../modal';

export default function EventLog({visible, onCancel, events}) {
  return <Modal visible={visible} className={styles.eventLog} onCancel={onCancel} footer={null}>
    <div className={styles.title}>Event Log</div>
    <p>Warning data here is a placeholder. In the next release this will be fixed.</p>
    <table>
      <tr>
        <th>Event</th>
        <th>Actor</th>
        <th>Datetime</th>
      </tr>
      {events.map((event, i) =>
        <tr key={`row${i}`}>
          {Object.values(event).map((column, j) => <td key={`col${j}`}>{column}</td>)}
        </tr>
      )}
    </table>
  </Modal>
}
