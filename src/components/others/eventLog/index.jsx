import React, { useContext, useEffect, useState } from "react";
import { constants, utils } from "ethers";
import * as styles from "./index.module.scss";

import Modal from "../../presentational/modal";
import { getLabel } from "../../../utils/account";
import { networkMap, EthereumContext } from "../../../data/ethereumProvider";

import AttachmentIcon from "jsx:/src/assets/attachment.svg";
import getTrustScore from "../../../businessLogic/getTrustScore";
import getTimePastSinceLastBountyUpdate from "/src/businessLogic/getTimePastSinceLastBountyUpdate";

import EyeIcon from "jsx:/src/assets/eye.svg";
import DisabledEyeIcon from "jsx:/src/assets/eyeDisabled.svg";
import Tabs from "../../presentational/tabs";

const EVENTS_TO_IGNGORE = ["Withdrawal"];
const IPFS_GATEWAY_URL = "https://ipfs.kleros.io";

export default function EventLog({ visible, onCancel, events }) {
  const [eventsWithEvidenceDetails, setEventsWithEvidenceDetails] = useState([...events]);
  const isMobileView = window?.innerWidth <= 600;

  useEffect(() => {
    const fetchEvidencesAndMerge = async (events) => {
      const updatedEvents = await Promise.all(
        events.map(async (event) => {
          if (event.name === "Evidence") {
            try {
              const response = await fetch(IPFS_GATEWAY_URL + event.details);
              const evidenceData = await response.json();
              return { ...event, details: evidenceData };
            } catch (error) {
              console.error("Failed to fetch event evidence from IPFS", error);
              return event;
            }
          }
          return event;
        })
      );
      setEventsWithEvidenceDetails(updatedEvents);
    };

    fetchEvidencesAndMerge(events);
  }, [events]);

  const filteredEvents = eventsWithEvidenceDetails.filter((e) => !EVENTS_TO_IGNGORE.includes(e.name));

  return (
    <Modal visible={visible} className={styles.eventLog} onCancel={onCancel} footer={null}>
      <div className={styles.title}>Event Log</div>
      {isMobileView ? (
        filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
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
            {filteredEvents.map((event) => (
              <EventTableRow key={event.id} event={event} />
            ))}
          </tbody>
        </table>
      )}
    </Modal>
  );
}

const EvidenceDisplay = ({ evidence }) => {
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
};

const EventCard = ({ event }) => {
  const [isExpanded, setEpanded] = useState(false);
  const { blockNumber, chainId, accounts, graphMetadata, metaEvidenceContents } = useContext(EthereumContext);
  const currenBlockNumber = graphMetadata?.block?.number || blockNumber;

  const getContent = () => {
    switch (event.name) {
      case "Evidence":
        return <EvidenceDisplay evidence={event.details} />;
      case "ArticleWithdrawal":
        return formatExtraData(event.name, calculateTrustScore(event.article, currenBlockNumber), metaEvidenceContents);
      default:
        return formatExtraData(event.name, event.details, metaEvidenceContents);
    }
  };

  return (
    <div className={styles.eventCard} onClick={() => setEpanded((prevState) => !prevState)}>
      <div className={styles.cardTitle}>{getPrettyNamesForEvents(event.name)}</div>
      <div className={styles.date}>{new Date(event.timestamp * 1000).toUTCString()}</div>
      {isExpanded ? <DisabledEyeIcon /> : <EyeIcon />}
      {isExpanded && (
        <Tabs
          items={[
            {
              label: "Actor",
              content: (
                <a href={networkMap[chainId]?.explorerURL(event.from)} target="_blank" rel="noreferrer noopener">
                  {getLabel(event.from, accounts[0])}
                </a>
              ),
            },
            { label: "Details", content: getContent() },
          ]}
        />
      )}
    </div>
  );
};

const EventTableRow = ({ event }) => {
  const [isExpanded, setEpanded] = useState(false);
  const { blockNumber, accounts, chainId, graphMetadata, metaEvidenceContents } = useContext(EthereumContext);
  const currenBlockNumber = graphMetadata?.block?.number || blockNumber;

  const isEvidence = event.name === "Evidence";
  return (
    <>
      <tr className={isExpanded ? styles.expanded : undefined}>
        <td>{getPrettyNamesForEvents(event.name)}</td>
        <td>
          {isEvidence ? (
            <div className={styles.expandButton} onClick={() => setEpanded((prevState) => !prevState)}>
              {isExpanded ? "Hide Details" : "Show Details"}
            </div>
          ) : event.name === "ArticleWithdrawal" ? (
            formatExtraData(event.name, calculateTrustScore(event.article, currenBlockNumber), metaEvidenceContents)
          ) : (
            formatExtraData(event.name, event.details, metaEvidenceContents)
          )}
        </td>
        <td>
          <a href={networkMap[chainId]?.explorerURL(event.from)} target="_blank" rel="noreferrer noopener">
            {getLabel(event.from, accounts[0])}
          </a>
        </td>
        <td>{new Date(event.timestamp * 1000).toUTCString()}</td>
      </tr>
      {isEvidence && isExpanded && (
        <tr>
          <td colSpan="4" className={styles.expanded}>
            <EvidenceDisplay evidence={event.details} />
          </td>
        </tr>
      )}
    </>
  );
};

function calculateTrustScore(article, latestBlockNumber) {
  return getTrustScore(article, getTimePastSinceLastBountyUpdate(article.lastBalanceUpdate, latestBlockNumber));
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

function formatExtraData(eventNameAsInSourceCode, extraData, metaEvidenceContents) {
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
