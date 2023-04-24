import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./index.module.scss";

import LazyLoader from "/src/components/others/lazyLoader";
import ListArticles from "/src/components/others/listArticles";
import LoadingSpinner from "/src/components/presentational/loadingSpinner";

import useGraphFetcher from "/src/hooks/useGraphFetcher";
import { getArticlesByAuthor } from "/src/data/ethereumProvider";
import { EthereumContext } from "../../data/ethereumProvider";

export default function Account() {
  const navigate = useNavigate();
  const { accounts, chainId } = useContext(EthereumContext);

  const fetchData = useCallback(async () => {
    return getArticlesByAuthor(chainId, accounts[0]);
  }, [chainId, accounts[0]]);

  const { data, isFetching } = useGraphFetcher(fetchData);

  useEffect(() => {
    navigate(`/${chainId}/account/${accounts[0]}`, { replace: true });
  }, [chainId, accounts[0]]);

  return (
    <div className={styles.account}>
      <div className={styles.author}>
        Author: <span>{accounts[0]}</span>
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
