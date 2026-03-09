import { useEffect, useState } from "react";
import fetchIPFSJson from "/src/utils/fetchIPFSJson";

export default function usePolicy(policyURI) {
  const [policy, setPolicy] = useState({});

  useEffect(() => {
    async function fetchPolicy() {
      setPolicy(await fetchIPFSJson(policyURI));
    }

    fetchPolicy();
  }, [policyURI]);

  return policy;
}
