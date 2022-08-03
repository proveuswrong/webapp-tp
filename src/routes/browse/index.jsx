import {useSearchParams, Link, useParams, useNavigate, useLocation} from "react-router-dom";
import ListClaims from "../../components/listClaims";
import EthereumProviderErrors from "../../components/ethereumProviderErrors";
import {useContext, useEffect} from "react";
import {EthereumContext, contractInstances, getClaimByID} from "../../data/ethereumProvider";
import SyncStatus from "../../components/ui/syncStatus";


import * as styles from "./index.module.scss";

export default function Browse() {

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const ethereumContext = useContext(EthereumContext);

  useEffect(() => {
    console.log('entered');
    console.log(ethereumContext)

    if (!params.chain) {
      console.log('navigated to first network in the list')
      navigate(Object.keys(contractInstances)[0] + '/')
    } else if (contractInstances[params.chain] && ethereumContext.chainId != params.chain)
      ethereumContext.changeChain(params.chain);

  }, [ethereumContext?.graphMetadata?.block.number]);

  if (contractInstances[params.chain] || ethereumContext.isDeployedOnThisChain) {

    return (
      <section className={styles.browse}>
        <ListClaims/>
        <SyncStatus syncedBlock={ethereumContext?.graphMetadata?.block?.number} latestBlock={parseInt(ethereumContext?.blockNumber, 16)}/>
      </section>
    )
  } else {
    return <EthereumProviderErrors providedChainId={params.chain}/>
  }


}


