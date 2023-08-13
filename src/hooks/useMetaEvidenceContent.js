import { useEffect, useState } from "react";
import { getAllMetaEvidences } from "../data/api";
import { ipfsGateway } from "../utils/addToIPFS";

const useMetaEvidenceContent = (chainId) => {
  const [metaEvidenceContents, setMetaEvidenceContents] = useState([]);

  useEffect(() => {
    if (!chainId) return;
    (async () => {
      const rawMetaEvidenceList = (await getAllMetaEvidences(chainId))?.map((item) => item.uri);
      if (!rawMetaEvidenceList) return;

      const result = await Promise.allSettled(
        rawMetaEvidenceList.map((metaEvidenceURI) => fetch(ipfsGateway + metaEvidenceURI).then((r) => r.json()))
      );
      setMetaEvidenceContents(result.map((item) => item?.value));
    })();
  }, [chainId]);
  return metaEvidenceContents;
};

export default useMetaEvidenceContent;
