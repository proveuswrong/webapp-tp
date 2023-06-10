import * as styles from "./index.module.scss";

import Tag from "/src/components/presentational/tag";
import Pill from "/src/components/presentational/pill";

export default function Content(props) {
  const { articleContent, articleStatus } = props;
  return (
    <>
      <div>
        <h1 className={styles.title}>{articleContent?.title}</h1>
        <Pill>{articleStatus}</Pill>
      </div>

      <p className={styles.description}> {articleContent?.description}</p>
      <div className={styles.containerTag}>
        {articleContent?.tags?.split(" ").map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
    </>
  );
}
