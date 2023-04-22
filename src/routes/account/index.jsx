import { useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import ListArticles from "/src/components/others/listArticles";

import useGraphFethcer from "/src/hooks/useGraphFetcher";
import { getArticlesByAuthor } from "/src/data/ethereumProvider";

export default function Account() {
  const params = useParams();
  const { data, isFetching } = useGraphFethcer(() => getArticlesByAuthor(params.chain, params.id));

  return (
    <div className={styles.account}>
      <div className={styles.author}>
        Author: <span>{params.id}</span>
      </div>
      <div className={styles.totalPublished}>
        Total published: <span>{data?.length}</span>
      </div>
      <div className={styles.articles}>
        <h3>My Articles</h3>
        <hr />
        <ListArticles articles={data} isFetching={isFetching} />
      </div>
    </div>
  );
}
