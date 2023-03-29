import {useParams, useNavigate} from "react-router-dom";
import ListClaims from "../../components/others/listClaims";
import EthereumProviderErrors from "../../components/others/ethereumProviderErrors";
import {useContext, useEffect} from "react";
import {EthereumContext, networkMap} from "../../data/ethereumProvider";
import SyncStatus from "../../components/presentational/syncStatus";


import * as styles from "./index.module.scss";

export default function Browse() {

  const params = useParams();
  const navigate = useNavigate();
  const ethereumContext = useContext(EthereumContext);

  useEffect(() => {
    if (!params.chain || !networkMap[params.chain].contractInstances) {
      console.log('navigated to first network in the list')
      navigate('/' + Object.keys(networkMap[params.chain].contractInstances)[0] + '/')
    } else if (networkMap[params.chain].contractInstances && ethereumContext?.chainId != params.chain) {
      ethereumContext?.changeChain(params.chain);
    }
  }, [ethereumContext?.graphMetadata?.block.number]);

  if (networkMap[params.chain].contractInstances || ethereumContext?.isDeployedOnThisChain) {

    return (
      <section className={styles.browse}>
        <ListClaims/>
        <SyncStatus syncedBlock={ethereumContext?.graphMetadata?.block?.number} latestBlock={parseInt(ethereumContext?.blockNumber, 16)}
                    subgraphDeployment={ethereumContext?.graphMetadata?.deployment}
                    providerURL={ethereumContext?.ethersProvider?.connection?.url}/>
      </section>
    )
  } else {
    return <EthereumProviderErrors providedChainId={params.chain}/>
  }


}


