import { useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import { getCourtById, networkMap } from "/src/data/ethereumProvider";
import usePolicy from "/src/hooks/usePolicy";
import useGraphFetcher from "/src/hooks/useGraphFetcher";
import { useCallback, useEffect } from "react";

const PERIODS = ["Evidence", "Vote", "Appeal", "Execution"];

export default function Court() {
  const params = useParams();

  const fetchData = useCallback(() => {
    return getCourtById(params.chain, params.contract, params.id);
  }, [params.chain, params.contract, params.id]);

  const { data: court } = useGraphFetcher(fetchData);
  const policy = usePolicy(court?.policyURI);

  useEffect(() => {
    if (!params.chain) {
      navigate("/" + Object.keys(networkMap)[0] + "/");
    } else {
      ethereumContext?.changeChain(params.chain);
    }
  });

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
