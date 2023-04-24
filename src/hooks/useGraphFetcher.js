import { useContext, useEffect, useState } from "react";
import { EthereumContext } from "../data/ethereumProvider";

export default function useGraphFethcer(fetchCallback) {
    const ethereumContext = useContext(EthereumContext);
    const [data, setData] = useState();
    const [isFetching, setFetching] = useState(true);

    useEffect(() => {
        if (!ethereumContext?.isDeployedOnThisChain) return;
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
    }, [ethereumContext?.graphMetadata?.block?.number, fetchCallback]);

    return { data, isFetching }
}