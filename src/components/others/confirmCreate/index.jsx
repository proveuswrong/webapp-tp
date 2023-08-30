import Tag from "/src/components/presentational/tag";
import * as styles from "./index.module.scss";
import { constants } from "ethers";
import CustomButton from "/src/components/presentational/button";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function ConfirmCreate({
  title,
  description,
  tags,
  bounty,
  categoryNo,
  format,
  handleCreate,
  handleGoBack,
}) {
  return (
    <>
      <div className={styles.bountyAmount}>
        Bounty: {bounty} {constants.EtherSymbol}
      </div>
      <h1>{title}</h1>
      {format == "markdown" ? (
        <ReactMarkdown className={styles.description} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {description}
        </ReactMarkdown>
      ) : (
        <p className={styles.description}>{description}</p>
      )}

      <div className={styles.containerTag}>
        {tags
          .split(" ")
          .filter((tag) => tag !== "")
          .map((tag, index) => (
            <Tag key={"tag" + index}>{tag}</Tag>
          ))}
      </div>

      <div className={styles.buttons}>
        <CustomButton type="button" modifiers="secondary" onClick={handleGoBack}>
          Go Back And Edit
        </CustomButton>
        <CustomButton type="button" onClick={handleCreate}>
          Publish
        </CustomButton>
      </div>
    </>
  );
}
