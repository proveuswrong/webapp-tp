import {useSearchParams, Link} from "react-router-dom";
import {EthereumContext, getAllClaims} from "../../data/ethereumProvider";
import {ipfsGateway} from "../../utils/addToIPFS";
import React, {useState, useEffect, useContext} from "react";
import ListClaimsItem from "/src/components/ui/listClaimsItem";
import Pill from "../ui/pill";
import * as styles from "./index.module.scss";
import getTrustScore from "../../businessLogic/getTrustScore";
import getTimePastSinceLastBountyUpdate from "../../businessLogic/getTimePastSinceLastBountyUpdate";


export default function ListClaims() {
  const [claims, setClaims] = useState();
  const [claimContents, setClaimContents] = useState()
  const ethereumContext = useContext(EthereumContext);

  const [fetchingClaims, setFetchingClaims] = useState(true)
  const [loadingFetchingContents, setFetchingClaimsContents] = useState(true)


  useEffect(() => {
    if (!ethereumContext?.isDeployedOnThisChain) return;

    console.log('Fetching claims...')
    let didCancel = false;

    async function fetchFromGraph() {
      if (!didCancel) {
        let data = await getAllClaims(ethereumContext?.chainId);
        setClaims(data)
        setFetchingClaims(false)
      }
    }

    fetchFromGraph()

    return () => {
      didCancel = true
    }


  }, [ethereumContext?.chainId, ethereumContext?.graphMetadata?.block?.number])


  useEffect(() => {
    let didCancel = false;
    if (!didCancel && claims) {
      claims.filter(c => c != null).map((claim) => fetch(ipfsGateway + claim?.claimID).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        response.json().then(data => {
          setClaimContents((prevState) => ({
            ...prevState,
            [claim.claimID]: {title: data.title, description: data.description}
          }))

          setFetchingClaimsContents(false)
        });
      }, (err) => {
        console.error(err)
      }))
    } else {
      setFetchingClaimsContents(false)
    }
    return () => {
      didCancel = true
    }

  }, [claims])


  return (
    <>
      <div className={styles.containerItems}>
        {claims && Object.entries(claims.filter(c => c != null)).sort(([, item1], [, item2]) => sortAccordingToTrustScore(item1, item2, ethereumContext)).map(([_key, value], index) =>
          <ListClaimsItem
            key={value?.id}
            title={claimContents?.[value?.claimID]?.title || (!loadingFetchingContents && `Unable to fetch claim data from ${value?.claimID}`)}
            description={claimContents?.[value?.claimID]?.description}
            linkTo={`${value?.contractAddress}/${value?.id}/`}
            score={getTrustScore(value, getTimePastSinceLastBountyUpdate(value?.lastBalanceUpdate, ethereumContext?.graphMetadata?.block?.number || ethereumContext?.blockNumber))}
            createdAt={value?.createdAtTimestamp}
            excerptSize={index % 2 == 1 ? 3 : 1}>
            <Pill modifiers='small'>{value?.status}</Pill>
          </ListClaimsItem>
        )}
      </div>
      {!claims && fetchingClaims && 'Fetching news...'}
      {!fetchingClaims && (claims == null || (claims && claims.filter(c => c != null).length == 0)) && 'No news articles.'}
      {claims && loadingFetchingContents && 'Fetching claim details.'}
    </>
  );
}

const sortAccordingToTrustScore = (item1, item2, ethereumContext) => getTrustScore(item2, getTimePastSinceLastBountyUpdate(item2?.lastBalanceUpdate, ethereumContext?.graphMetadata?.block?.number || ethereumContext?.blockNumber)) - getTrustScore(item1, getTimePastSinceLastBountyUpdate(item1?.lastBalanceUpdate, ethereumContext?.graphMetadata?.block?.number || ethereumContext?.blockNumber))
