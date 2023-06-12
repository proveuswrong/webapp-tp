import { useContext } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import EthereumProviderErrors from "/src/components/others/ethereumProviderErrors";
import ListArticles from "/src/components/others/listArticles";
import SyncStatus from "/src/components/presentational/syncStatus";

import { EthereumContext, networkMap, getAllArticles } from "/src/data/ethereumProvider";
import populateArticleContents from "../../utils/populateArticleContents";

export async function loader({ params }) {
  const articles = await getAllArticles(params.chain);
  return await populateArticleContents(articles);
}

export default function Browse() {
  const params = useParams();
  const ethereumContext = useContext(EthereumContext);

  const articles = useLoaderData();

  if (networkMap[ethereumContext?.chainId]?.deployments || ethereumContext?.isDeployedOnThisChain) {
    return (
      <section className={styles.browse}>
        <ListArticles articles={articles} />
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
