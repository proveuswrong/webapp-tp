import { useContext, useEffect, useState } from "react";
import { EthereumContext } from "../data/ethereumContext";
import { isDeployedOnThisChain } from "../connectors/networks";

export default function useGraphFetcher(fetchCallback) {
  const { state, graphMetadata } = useContext(EthereumContext);
  const [data, setData] = useState();
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    if (isDeployedOnThisChain(state.appChainId)) return;
    let didCancel = false;

    async function fetchFromGraph() {
      if (!didCancel) {
        const data = await fetchCallback();
        setData(data);
        setFetching(false);
      }
    }

    fetchFromGraph();
    return () => {
      didCancel = true;
    };
  }, [graphMetadata?.block?.number, fetchCallback]);

  return { data, isFetching };
}
