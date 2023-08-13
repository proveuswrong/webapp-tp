import { useEffect, useState } from "react";
import { getGraphMetadata } from "../data/api";
import { networkMap } from "../connectors/networks";
import { Address, getAddress } from "viem";

const LONGPOLLING_PERIOD_MS = 20000;

interface GraphMetadataResult {
  block: {
    hash: string;
    number: number;
  };
  deployment: string;
  hasIndexingError: boolean;
}

const useGraphMetadata = (chainId: string): GraphMetadataResult | undefined => {
  const [graphMetadata, setGraphMetadata] = useState<GraphMetadataResult>();

  useEffect(() => {
    if (!chainId) return;
    const fetchGraphMetadata = async (targetChainId: string) => {
      const res = await getGraphMetadata(
        targetChainId,
        getAddress(Object.keys(networkMap[targetChainId].deployments)[0])
      );
      setGraphMetadata(res);
    };

    fetchGraphMetadata(chainId);
    const pollingInterval = setInterval(() => fetchGraphMetadata(chainId), LONGPOLLING_PERIOD_MS);

    return () => clearInterval(pollingInterval);
  }, [chainId]);

  return graphMetadata;
};

export default useGraphMetadata;
