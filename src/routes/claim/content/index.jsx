import * as styles from "./index.module.scss";

import Tag from "/src/components/ui/tag";
import Pill from "/src/components/ui/pill";

export default function Content(props) {
  const { claimContent, claimStatus, fetchingClaimContent } = props;

  if (fetchingClaimContent) return <h1>Fetching...</h1>;
  if (!(claimContent?.title && claimContent?.description) && !fetchingClaimContent)
    return <h1>Failed to fetch article content</h1>;

  return (
    <>
      <h1 className={styles.title}>{claimContent?.title}</h1>
      <Pill>{claimStatus}</Pill>

      <p className={styles.description}> {claimContent?.description}</p>
      <div className={styles.containerTag}>
        {claimContent?.tags?.split(" ").map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
    </>
  );
}
