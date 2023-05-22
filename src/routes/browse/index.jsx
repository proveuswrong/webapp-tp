import { useCallback, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as styles from "./index.module.scss";

import EthereumProviderErrors from "/src/components/others/ethereumProviderErrors";
import Loader from "/src/components/others/loader";
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
    // TODO Otherwise, on page load chainId won't be set. This is overly complicated, should be refactored. See issue #156.
    if (!params.chain) {
      navigate("/" + Object.keys(networkMap)[0] + "/");
    } else if (networkMap[params.chain]?.contractInstances && ethereumContext?.chainId != params.chain) {
      ethereumContext?.changeNetwork(params.chain);
    }
  });

  if (networkMap[ethereumContext?.chainId]?.contractInstances || ethereumContext?.isDeployedOnThisChain) {
    return (
      <section className={styles.browse}>
        <Loader fallback={<LoadingSpinner />} isLoading={isFetching}>
          <ListArticles articles={data} isFetching={isFetching} />
        </Loader>
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
