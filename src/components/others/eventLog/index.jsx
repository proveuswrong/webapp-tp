import React, { useContext, useEffect, useState } from "react";
import { constants, utils } from "ethers";
import * as styles from "./index.module.scss";

import Modal from "../../presentational/modal";
import { getLabel } from "../../../utils/account";
import { networkMap, EthereumContext } from "../../../data/ethereumProvider";

import AttachmentIcon from "jsx:/src/assets/attachment.svg";
import getTrustScore from "../../../businessLogic/getTrustScore";
import getTimePastSinceLastBountyUpdate from "/src/businessLogic/getTimePastSinceLastBountyUpdate";

const EVENTS_TO_IGNGORE = ["Withdrawal"];
const IPFS_GATEWAY_URL = "https://ipfs.kleros.io";

export default function EventLog({ visible, onCancel, events }) {
  const ethereumContext = useContext(EthereumContext);
  const [evidenceDetails, setEvidenceDetails] = useState({});
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleEvidenceRow = (index) => {
    const updatedRows = [...expandedRows];
    if (updatedRows.includes(index)) {
      updatedRows.splice(updatedRows.indexOf(index), 1);
    } else {
      updatedRows.push(index);
    }
    setExpandedRows(updatedRows);
  };

  useEffect(() => {
    async function fetchEvidences(ipfsPaths) {
      try {
        const responses = await Promise.all(ipfsPaths.map((path) => fetch(IPFS_GATEWAY_URL + path)));
        const data = await Promise.all(responses.map((response) => response.json()));
        const evidences = ipfsPaths.reduce((acc, path, index) => ({ ...acc, [path]: data[index] }), {});

        setEvidenceDetails(evidences);
      } catch (error) {
        console.error("Failed to fetch event evidences from IPFS", error);
      }
    }
    console.log({ events });

    const ipfsPaths = events.filter((event) => event.name === "Evidence").map((event) => event.details);
    if (ipfsPaths.length) fetchEvidences(ipfsPaths);
  }, [events]);

  const calculateTrustScore = (article) => {
    return getTrustScore(
      article,
      getTimePastSinceLastBountyUpdate(
        article.lastBalanceUpdate,
        ethereumContext?.graphMetadata?.block?.number || ethereumContext?.blockNumber
      )
    );
  };

  return (
    <Modal visible={visible} className={styles.eventLog} onCancel={onCancel} footer={null}>
      <div className={styles.title}>Event Log</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Actor</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {events
            .filter((e) => !EVENTS_TO_IGNGORE.includes(e.name))
            .map((event, i) => {
              const isEvidence = event.name === "Evidence";
              const isExpanded = expandedRows.includes(i);
              return (
                <React.Fragment key={`row${i}`}>
                  <tr className={isExpanded ? styles.expanded : undefined}>
                    <td>{getPrettyNamesForEvents(event.name)}</td>
                    <td>
                      {isEvidence ? (
                        <div className={styles.expandButton} onClick={() => toggleEvidenceRow(i)}>
                          {isExpanded ? "Hide Details" : "Show Details"}
                        </div>
                      ) : event.name === "ArticleWithdrawal" ? (
                        formatExtraData(event.name, calculateTrustScore(event.article), ethereumContext)
                      ) : (
                        formatExtraData(event.name, event.details, ethereumContext)
                      )}
                    </td>
                    <td>
                      <a
                        href={networkMap[ethereumContext?.chainId]?.explorerURL(event.from)}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {getLabel(event.from, ethereumContext?.accounts[0])}
                      </a>
                    </td>
                    <td>{new Date(event.timestamp * 1000).toUTCString()}</td>
                  </tr>
                  {isEvidence && isExpanded && (
                    <tr>
                      <td colSpan="4" className={styles.expanded}>
                        <EvidenceDisplay evidence={evidenceDetails[event.details]} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
    </Modal>
  );
}

function EvidenceDisplay({ evidence }) {
  return (
    <div className={styles.evidenceDisplay}>
      <div className={styles.header}>
        <div>{evidence.name}</div>
        <a href={`${IPFS_GATEWAY_URL + evidence.fileURI}`} target="_blank" rel="noreferrer noopener">
          <AttachmentIcon />
        </a>
      </div>
      <hr />
      <div className={styles.description}>{evidence.description}</div>
    </div>
  );
}

function getPrettyNamesForEvents(sourceCodeName) {
  switch (sourceCodeName) {
    case "NewArticle":
      return "New Article";
    case "ArticleWithdrawal":
      return "Article Unpublished";
    case "BalanceUpdate":
      return "Bounty Increase";
    case "Ruling":
      return "Arbitrator Ruling";
    case "RulingFunded":
      return "Funded Ruling";
    default:
      return sourceCodeName;
  }
}

function formatExtraData(eventNameAsInSourceCode, extraData, ethereumContext) {
  const { metaEvidenceContents } = ethereumContext;
  switch (eventNameAsInSourceCode) {
    case "NewArticle":
      return `Curation Pool 0: ${metaEvidenceContents[extraData]?.category}`;
    case "ArticleWithdrawal":
      return `Last calculated Trust Score: ${extraData}`;
    case "BalanceUpdate":
      return `New Bounty: ${parseFloat(utils.formatUnits(extraData)).toFixed(3)} ${constants.EtherSymbol}`;
    case "Challenge":
      return `${metaEvidenceContents[0]?.question}`;
    case "Ruling":
      return `${
        extraData == 0
          ? "Jury was absent, refused to arbitrate, or it was a tie. Challenge failed."
          : metaEvidenceContents[0]?.rulingOptions.titles[extraData - 1]
      }`;
    case "RulingFunded":
      return metaEvidenceContents[0]?.rulingOptions.titles[extraData - 1];
    case "Contribution":
      const [ruling, amount] = extraData.split("-");
      return `${parseFloat(utils.formatUnits(amount)).toFixed(3)} ${constants.EtherSymbol} in favor of Ruling: ${
        metaEvidenceContents[0]?.rulingOptions.titles[ruling - 1]
      }`;
    case "TimelockStarted":
      return `Article can be unpublished on: ${new Date(extraData * 1000).toUTCString()}`;
    default:
      return extraData;
  }
}
