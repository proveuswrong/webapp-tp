import { useContext } from "react";
import * as styles from "./index.module.scss";

import { Tooltip } from "antd";
import { EthereumContext } from "/src/data/ethereumProvider";
import CustomButton from "/src/components/ui/button";
import { getLabel } from "/src/utils/account";

export default function Metadata(props) {
  const { claim, fetchingClaim, setEventLogOpen } = props;
  const ethereumContext = useContext(EthereumContext);

  return (
    <div className={styles.containerMetadata}>
      <div>
        <Tooltip
          placement="left"
          title={`Pool name: ${ethereumContext?.metaEvidenceContents[claim?.category]?.category}`}
        >
          <span>
            <b>Curation Pool ID: {claim?.category}</b>
          </span>
        </Tooltip>

        {claim?.createdAtBlock && (
          <span>
            {" "}
            Posted on{" "}
            <Tooltip placement="left" title={`Exact block number: ${claim?.createdAtBlock}`}>
              {new Date(parseInt(claim?.createdAtTimestamp) * 1000).toUTCString()}
            </Tooltip>{" "}
            by{" "}
            <Tooltip
              key={`postedBy${claim?.owner}${ethereumContext?.accounts[0]}`}
              className="blink"
              placement="bottomRight"
              title={claim?.owner}
            >
              {fetchingClaim ? "fetching" : getLabel(claim?.owner, ethereumContext?.accounts[0])}
            </Tooltip>
          </span>
        )}

        {claim?.disputeID && (
          <span>
            Latest {claim?.disputes && `(out of ${claim?.disputes?.length})`} dispute ID:{" "}
            <a
              key={claim?.disputeID}
              className="blink"
              href={`https://resolve.kleros.io/cases/${claim.disputeID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {claim?.disputeID}
            </a>
          </span>
        )}
      </div>
      <div>
        <CustomButton
          modifiers="secondary small"
          onClick={() => {
            setEventLogOpen(true);
          }}
        >
          History
        </CustomButton>
      </div>
    </div>
  );
}
