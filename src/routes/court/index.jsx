import { redirect, useLoaderData } from "react-router-dom";
import * as styles from "./index.module.scss";

import { getCourtById, getDefaultNetwork, networkMap } from "/src/data/ethereumProvider";
import fetchIPFSJson from "/src/utils/fetchIPFSJson";

const PERIODS = ["Evidence", "Vote", "Appeal", "Execution"];

export async function loader({ params }) {
  const { chain, contract, id } = params;
  if (!networkMap[chain]?.deployments?.[contract]) return redirect(`/${getDefaultNetwork()}`);

  const court = await getCourtById(chain, contract, id);
  court.policy = await fetchIPFSJson(court.policyURI);
  return court;
}

export default function Court() {
  const court = useLoaderData();

  return (
    <div className={styles.court}>
      <h1>{court.policy.name}</h1>
      <h3>Court Purpose</h3>
      <p>{court.policy.description}</p>
      <h3>Policy</h3>
      <p>{court.policy.summary}</p>

      <hr />

      <div className={styles.periods}>
        {PERIODS.map((period, _index) => (
          <div key={period}>
            <p>{period} Period</p>
            <p>{court.timesPerPeriod[_index]}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Hidden Votes</p>
        <p>{!court.hiddenVotes ? "false" : "true"}</p>
      </div>
    </div>
  );
}
