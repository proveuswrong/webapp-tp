import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import { EthereumContext, getCourtById } from "/src/data/ethereumProvider";
import usePolicy from "/src/hooks/usePolicy";

const PERIODS = ["Evidence", "Vote", "Appeal", "Execution"];

export default function Court() {
  const [court, setCourt] = useState();
  const [fetchingCourt, setFetchingCourt] = useState(true);
  const ethereumContext = useContext(EthereumContext);
  const params = useParams();
  const policy = usePolicy(court?.policyURI);

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      getCourtById(params.chain, params.contract, params.id).then((data) => {
        setCourt(data);
        setFetchingCourt(false);
      });
    }

    return () => {
      didCancel = true;
    };
  }, [ethereumContext?.graphMetadata?.block?.number]);

  return (
    <div className={styles.court}>
      <h1>{policy?.name}</h1>
      <h3>Court Purpose</h3>
      <p>{policy.description}</p>
      <h3>Policy</h3>
      <p>{policy.summary}</p>

      <hr />

      <div className={styles.periods}>
        {PERIODS.map((period, _index) => (
          <div key={period}>
            <p>{period} Period</p>
            <p>{court?.timesPerPeriod[_index]}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Hidden Votes</p>
        <p>{!court?.hiddenVotes ? "false" : "true"}</p>
      </div>
    </div>
  );
}
