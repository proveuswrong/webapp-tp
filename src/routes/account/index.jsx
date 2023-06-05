import { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import Loader from "/src/components/others/loader";
import ListArticles from "/src/components/others/listArticles";
import LoadingSpinner from "/src/components/presentational/loadingSpinner";

import useGraphFetcher from "/src/hooks/useGraphFetcher";
import { getArticlesByAuthor, networkMap } from "/src/data/ethereumProvider";
import { EthereumContext } from "../../data/ethereumProvider";

export default function Account() {
  const params = useParams();
  const navigate = useNavigate();
  const { accounts, chainId } = useContext(EthereumContext);

  const fetchData = useCallback(async () => {
    return getArticlesByAuthor(chainId, accounts[0]);
  }, [chainId, accounts[0]]);

  const { data, isFetching } = useGraphFetcher(fetchData);

  /*   useEffect(() => {
    if (accounts[0]) {
      navigate(`/${chainId}/account/${accounts[0]}`);
    }
  }, [chainId, accounts[0]]); */

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
        <Loader fallback={<LoadingSpinner />} isLoading={isFetching}>
          <ListArticles articles={data} isFetching={isFetching} />
        </Loader>
      </div>
    </div>
  );
}
