import { useLoaderData, useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import ListArticles from "/src/components/others/listArticles";
import { getArticlesByAuthor } from "/src/data/ethereumProvider";
import { ipfsGateway } from "/src/utils/addToIPFS";

export async function loader({ params }) {
  const articles = await getArticlesByAuthor(params.chain, params.id);
  const fetchPromises = articles.map(async (article) => {
    if (!article) return null;
    try {
      const response = await fetch(ipfsGateway + article?.articleID);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const { title, description } = await response.json();
      article.title = title;
      article.description = description;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  });

  await Promise.all(fetchPromises);
  return articles;
}

export default function Account() {
  const { id } = useParams();
  const data = useLoaderData();

  return (
    <div className={styles.account}>
      <div className={styles.author}>
        Author: <span>{id}</span>
      </div>
      <div className={styles.totalPublished}>
        Total published: <span>{data?.length ?? 0}</span>
      </div>
      <div className={styles.articles}>
        <h3>My Articles</h3>
        <hr />
        <ListArticles articles={data} />
      </div>
    </div>
  );
}
