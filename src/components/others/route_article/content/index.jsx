import * as styles from "./index.module.scss";

import Tag from "/src/components/presentational/tag";
import Pill from "/src/components/presentational/pill";

export default function Content(props) {
  const { articleContent, articleStatus, fetchingArticleContent } = props;

  if (fetchingArticleContent) return <h1>Fetching...</h1>;
  if (!(articleContent?.title && articleContent?.description) && !fetchingArticleContent)
    return <h1>Failed to fetch article content</h1>;

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
