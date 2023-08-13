import { useLoaderData, useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import ListArticles from "/src/components/others/listArticles";
import SyncStatus from "/src/components/presentational/syncStatus";

import populateArticleContents from "../../utils/populateArticleContents";
import { useConnection, useEthereum } from "../../data/ethereumContext";
import { isDeployedOnThisChain, networkMap } from "../../connectors/networks";
import { getAllArticles } from "../../data/api";

export async function loader({ params }) {
  const articles = await getAllArticles(params.chain);
  return await populateArticleContents(articles);
}

export default function Browse() {
  const params = useParams();
  const { state, graphMetadata } = useEthereum();
  const connection = useConnection();
  const articles = useLoaderData();

  console.log({ connection, state });
  return (
    <section className={styles.browse}>
      <ListArticles articles={articles} />
      <SyncStatus
        syncedBlock={graphMetadata?.block?.number}
        latestBlock={parseInt(state.blockNumber, 16)}
        subgraphDeployment={graphMetadata?.deployment}
        providerURL={connection.currentConnector.name} // TODO: use connector type instead
      />
    </section>
  );
}
