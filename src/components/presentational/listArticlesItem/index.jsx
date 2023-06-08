import React from "react";
import { Link } from "react-router-dom";
import * as styles from "./index.module.scss";
import ReactMarkdown from "react-markdown";

export default function ListArticlesItem({
  title,
  description,
  format,
  score,
  createdAt,
  children,
  linkTo,
  excerptSize,
}) {
  return (
    <Link className={styles.listArticlesItem} to={linkTo}>
      <div className={styles.trustScore}>
        <span>
          Trust Score:{" "}
          <span key={title + score} className="blink">
            {score}
          </span>{" "}
        </span>
        <span className={styles.children}>{children}</span>
      </div>

      <div className={styles.title}>{title}</div>

      {format == "markdown" ? (
        <ReactMarkdown className={styles.description}>
          {description
            ?.split(" ")
            .slice(0, 20 * excerptSize)
            .join(" ")
            .concat("...")}
        </ReactMarkdown>
      ) : (
        <div className={styles.description}>
          {description
            ?.split(" ")
            .slice(0, 20 * excerptSize)
            .join(" ")
            .concat("...")}
        </div>
      )}
      <div className={styles.createdAt}>{new Date(parseInt(createdAt) * 1000).toUTCString()}</div>
    </Link>
  );
}
