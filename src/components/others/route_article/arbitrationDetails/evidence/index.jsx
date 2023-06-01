import { useContext, useEffect, useState } from "react";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";

import { getLabel } from "/src/utils/account";
import { EthereumContext } from "../../../../../data/ethereumProvider";

import AttachmentIcon from "jsx:/src/assets/attachment.svg";

const IPFS_GATEWAY = "https://ipfs.kleros.io";

export default function EvidencePeriod({ evidenceEvents, setEvidenceModalOpen }) {
  const { accounts } = useContext(EthereumContext);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!evidenceEvents > 0) return;
      const data = await Promise.all(
        evidenceEvents.map(async (evidence) => {
          const response = await fetch(IPFS_GATEWAY + evidence.details);
          const responseData = await response.json();
          return responseData;
        })
      );
      setFetchedData(data);
    };

    fetchData();
  }, [evidenceEvents]);

  return (
    <div className={styles.evidencePeriod}>
      <h3>Evidence</h3>
      {evidenceEvents.length > 0 ? (
        evidenceEvents.map((evidence, index) => {
          return (
            <div key={index} className={styles.evidenceCard}>
              <div className={styles.header}>
                <h4 className={styles.title}>{fetchedData[index]?.name}</h4>
                <a href={IPFS_GATEWAY + fetchedData[index]?.fileURI} target="_blank" rel="noreferrer noopener">
                  <AttachmentIcon />
                </a>
              </div>
              <div className={styles.description}>
                <TruncateText text={fetchedData[index]?.description} />
              </div>
              <div className={styles.timestamp}>
                Submitted on <span>{new Date(evidence.timestamp * 1000).toUTCString()}</span> by{" "}
                <span>{getLabel(evidence.from, accounts[0])}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Evidence</div>
      )}
      <div className={styles.button}>
        <CustomButton onClick={() => setEvidenceModalOpen(true)}>Submit Evidence</CustomButton>
      </div>
    </div>
  );
}

function TruncateText({ text, maxLength = 200 }) {
  const [showFullText, setShowFullText] = useState(false);
  const truncatedText = text?.slice(0, maxLength);

  if (text?.length < maxLength) return <p>{text}</p>;
  return (
    <>
      {showFullText ? (
        <p>{text}</p>
      ) : (
        <p>
          {truncatedText + " ... "}
          <a onClick={() => setShowFullText(true)}>read more</a>
        </p>
      )}
    </>
  );
}
