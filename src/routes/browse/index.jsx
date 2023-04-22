import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as styles from "./index.module.scss";

import ListArticles from "/src/components/others/listArticles";
import EthereumProviderErrors from "/src/components/others/ethereumProviderErrors";
import SyncStatus from "/src/components/presentational/syncStatus";

import { EthereumContext, networkMap, getAllArticles } from "/src/data/ethereumProvider";
import useGraphFethcer from "/src/hooks/useGraphFetcher";

export default function Browse() {
  const params = useParams();
  const navigate = useNavigate();
  const ethereumContext = useContext(EthereumContext);
  const { data, isFetching } = useGraphFethcer(() => getAllArticles(params.chain));

  useEffect(() => {
    if (!params.chain) {
      navigate("/" + Object.keys(networkMap)[0] + "/");
    } else if (networkMap[params.chain]?.contractInstances && ethereumContext?.chainId != params.chain)
      ethereumContext?.changeChain(params.chain);
  });

  if (networkMap[ethereumContext?.chainId]?.contractInstances || ethereumContext?.isDeployedOnThisChain) {
    return (
      <section className={styles.browse}>
        <ListArticles articles={data} isFetching={isFetching} />
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
