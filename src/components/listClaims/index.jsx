import {useSearchParams, Link} from "react-router-dom";
import {EthereumContext, getAllClaims} from "../../data/ethereumProvider";
import {ipfsGateway} from "../../utils/addToIPFS";
import React, {useState, useEffect, useContext} from "react";
import ListClaimsItem from "/src/components/ui/listClaimsItem";
import Pill from "../ui/pill";
import * as styles from "./index.module.scss";



export default function ListClaims() {
  const [claims, setClaims] = useState();
  const [claimContents, setClaimContents] = useState()
  const ethereumContext = useContext(EthereumContext);

  const [fetchingClaims, setFetchingClaims] = useState(true)
  const [loadingFetchingContents, setFetchingClaimsContents] = useState(true)


  let [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
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

    console.log(claims && claims)

  }, [ethereumContext.chainId, ethereumContext.blockNumber])


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
        {claims && Object.entries(claims.filter(c => c != null)).map(([key, value]) =>
            <ListClaimsItem
              title={claimContents?.[value?.claimID]?.title || (!loadingFetchingContents && `Unable to fetch claim data from ${value?.claimID}`)}
              linkTo={`${ethereumContext.chainId}/${value?.contractAddress}/${value?.id}`}
              score={1234}
              createdAt='2th May 2022  01:54 PM'>
                <Pill>{value?.status}</Pill>
            </ListClaimsItem>
        )}
      </div>
      {!claims && fetchingClaims && 'Fetching claims'}
      {!fetchingClaims && (claims == null || (claims && claims.filter(c => c != null).length == 0)) && 'No claims.'}
      {claims && loadingFetchingContents && 'Fetching claim details.'}
    </>
  );
}

