import { useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import LazyLoader from "/src/components/others/lazyLoader";
import ListArticles from "/src/components/others/listArticles";
import LoadingSpinner from "/src/components/presentational/loadingSpinner";

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
        <LazyLoader fallback={<LoadingSpinner />} isLoading={isFetching}>
          <ListArticles articles={data} isFetching={isFetching} />
        </LazyLoader>
      </div>
    </div>
  );
}
