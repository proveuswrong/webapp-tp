import { useContext, useEffect, useState } from "react";
import * as styles from "./index.module.scss";

import { getLabel } from "/src/utils/account";
import { EthereumContext } from "../../../../../data/ethereumProvider";

const IPFS_GATEWAY = "https://ipfs.kleros.io";

export default function EvidencePeriod({ evidenceEvents }) {
  console.log({ evidenceEvents });
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
      <h3>Evidences</h3>
      {evidenceEvents.length > 0 ? (
        evidenceEvents.map((evidence, index) => {
          return (
            <div key={index} className={styles.evidenceCard}>
              <h4>{fetchedData[index]?.name}</h4>
              <div className={styles.timestamp}>
                Submitted on <span>{new Date(evidence.timestamp * 1000).toUTCString()}</span> by{" "}
                <span>{getLabel(evidence.from, accounts[0])}</span>
              </div>
              <p className={styles.description}>{fetchedData[index]?.description}</p>
              <a href={IPFS_GATEWAY + fetchedData[index]?.fileURI} target="_blank" rel="noreferrer noopener">
                View Evidence
              </a>
            </div>
          );
        })
      ) : (
        <div>No Evidence</div>
      )}
    </div>
  );
}
