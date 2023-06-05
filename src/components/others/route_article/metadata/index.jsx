import { useContext } from "react";
import * as styles from "./index.module.scss";

import { Tooltip } from "antd";
import { EthereumContext } from "/src/data/ethereumProvider";
import CustomButton from "/src/components/presentational/button";
import { getLabel } from "/src/utils/account";

export default function Metadata(props) {
  const { article, fetchingarticle, setEventLogOpen } = props;
  const ethereumContext = useContext(EthereumContext);

  console.log(ethereumContext.metaEvidenceContents);
  console.log({ article });

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

        {article?.disputes.length > 0 && (
          <span>
            Latest {article?.disputes && `(out of ${article?.disputes?.length})`} dispute ID:{" "}
            <a
              key={article?.disputes.at(-1).id}
              className="blink"
              href={`https://resolve.kleros.io/cases/${article.disputes.at(-1).id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article?.disputes.at(-1).id}
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
