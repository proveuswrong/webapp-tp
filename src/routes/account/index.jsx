import { useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import LazyLoader from "/src/components/others/lazyLoader";
import ListArticles from "/src/components/others/listArticles";
import LoadingSpinner from "/src/components/presentational/loadingSpinner";

import useGraphFethcer from "/src/hooks/useGraphFetcher";
import { getArticlesByAuthor } from "/src/data/ethereumProvider";
import { useCallback, useContext } from "react";
import { EthereumContext } from "../../data/ethereumProvider";

export default function Account() {
  const params = useParams();
  const { accounts } = useContext(EthereumContext);

  const fetchData = useCallback(() => {
    return getArticlesByAuthor(params.chain, accounts[0]);
  }, [accounts[0]]);

  const { data, isFetching } = useGraphFethcer(fetchData);

  return (
    <div className={styles.account}>
      <div className={styles.author}>
        Author: <span>{params.id}</span>
      </div>
      <div className={styles.totalPublished}>
        Total published: <span>{data?.length ?? 0}</span>
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
