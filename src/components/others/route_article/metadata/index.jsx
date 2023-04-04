import { useContext } from "react";
import * as styles from "./index.module.scss";

import { Tooltip } from "antd";
import { EthereumContext } from "/src/data/ethereumProvider";
import CustomButton from "/src/components/presentational/button";
import { getLabel } from "/src/utils/account";

export default function Metadata(props) {
  const { article, fetchingarticle, setEventLogOpen } = props;
  const ethereumContext = useContext(EthereumContext);

  return (
    <div className={styles.containerMetadata}>
      <div>
        <Tooltip
          placement="left"
          title={`Pool name: ${ethereumContext?.metaEvidenceContents[article?.category]?.category}`}
        >
          <span>
            <b>Curation Pool ID: {article?.category}</b>
          </span>
        </Tooltip>

        {article?.createdAtBlock && (
          <span>
            {" "}
            Posted on{" "}
            <Tooltip placement="left" title={`Exact block number: ${article?.createdAtBlock}`}>
              {new Date(parseInt(article?.createdAtTimestamp) * 1000).toUTCString()}
            </Tooltip>{" "}
            by{" "}
            <Tooltip
              key={`postedBy${article?.owner}${ethereumContext?.accounts[0]}`}
              className="blink"
              placement="bottomRight"
              title={article?.owner}
            >
              {fetchingarticle ? "fetching" : getLabel(article?.owner, ethereumContext?.accounts[0])}
            </Tooltip>
          </span>
        )}

        {article?.disputeID && (
          <span>
            Latest {article?.disputes && `(out of ${article?.disputes?.length})`} dispute ID:{" "}
            <a
              key={article?.disputeID}
              className="blink"
              href={`https://resolve.kleros.io/cases/${article.disputeID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article?.disputeID}
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
