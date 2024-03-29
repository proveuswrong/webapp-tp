import * as styles from "./index.module.scss";
import Tag from "/src/components/presentational/tag";
import Pill from "/src/components/presentational/pill";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

export default function Content(props) {
  const { articleContent, articleStatus } = props;
  return (
    <>
      <div>
        <h1 className={styles.title}>{articleContent?.title}</h1>
        <Pill>{articleStatus}</Pill>
      </div>

      {articleContent?.format == "markdown" ? (
        <ReactMarkdown className={styles.description} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {articleContent?.description}
        </ReactMarkdown>
      ) : (
        <p className={styles.description}>{articleContent?.description}</p>
      )}
      <div className={styles.containerTag}>
        {articleContent?.tags
          ?.split(" ")
          .filter((tag) => tag !== "")
          .map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
      </div>
    </>
  );
}
