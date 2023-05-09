import { useCallback, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as styles from "./index.module.scss";

import EthereumProviderErrors from "/src/components/others/ethereumProviderErrors";
import LazyLoader from "/src/components/others/lazyLoader";
import ListArticles from "/src/components/others/listArticles";

import LoadingSpinner from "/src/components/presentational/loadingSpinner";
import SyncStatus from "/src/components/presentational/syncStatus";

import { EthereumContext, networkMap, getAllArticles } from "/src/data/ethereumProvider";
import useGraphFetcher from "/src/hooks/useGraphFetcher";

export default function Browse() {
  const params = useParams();
  const navigate = useNavigate();
  const ethereumContext = useContext(EthereumContext);

  const fetchData = useCallback(() => {
    return getAllArticles(params.chain);
  }, [params.chain]);

  const { data, isFetching } = useGraphFetcher(fetchData);

  useEffect(() => {
    if (!params.chain) {
      navigate("/" + Object.keys(networkMap)[0] + "/");
    } else {
      ethereumContext?.changeChain(params.chain);
    }
  });

  if (networkMap[ethereumContext?.chainId]?.contractInstances || ethereumContext?.isDeployedOnThisChain) {
    return (
      <section className={styles.browse}>
        <LazyLoader fallback={<LoadingSpinner />} isLoading={isFetching}>
          <ListArticles articles={data} isFetching={isFetching} />
        </LazyLoader>
        <SyncStatus
          syncedBlock={ethereumContext?.graphMetadata?.block?.number}
          latestBlock={parseInt(ethereumContext?.blockNumber, 16)}
          subgraphDeployment={ethereumContext?.graphMetadata?.deployment}
          providerURL={ethereumContext?.ethersProvider?.connection?.url}
        />
      </section>
    );
  } else {
    return <EthereumProviderErrors providedChainId={params.chain} />;
  }
}
