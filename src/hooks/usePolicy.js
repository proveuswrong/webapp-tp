import { useEffect, useState } from "react";
import { ipfsGateway } from "/src/utils/addToIPFS";

export default function usePolicy(policyURI) {
    const [policy, setPolicy] = useState('');

    useEffect(() => {
        async function fetchPolicy() {
            if (!policyURI) return;
            const response = await fetch(ipfsGateway + policyURI);
            setPolicy(await response.json());
        }
        fetchPolicy()
    }, [policyURI])
    return policy;
}