import * as styles from "./index.module.scss";

import Tooltip from "/src/components/ui/tooltip";
import Pill from "/src/components/ui/pill";
import Tag from "/src/components/ui/tag";
import CustomButton from "/src/components/ui/button";
import EventLog from "../../components/eventLog";

import {useParams, useNavigate} from "react-router-dom";
import Interval from "react-interval-rerender";
import {EthereumContext, getClaimByID} from "../../data/ethereumProvider";
import addToIPFS, {ipfsGateway} from "../../utils/addToIPFS";
import {getLabel} from "../../utils/account";

import {useEffect, useState, useContext} from "react";

import {utils, constants} from "ethers";
import getTrustScore from "../../businessLogic/getTrustScore";
import getTimePastSinceLastBountyUpdate from "../../businessLogic/getTimePastSinceLastBountyUpdate";
import SyncStatus from "../../components/ui/syncStatus";


// TODO Refactor out components from this route.
export default function Index() {
  const params = useParams();
  const navigate = useNavigate();

  const ethereumContext = useContext(EthereumContext);
  const [claim, setClaim] = useState();
  const [claimContent, setClaimContent] = useState();
  const [fetchingClaim, setFetchingClaim] = useState(true);
  const [fetchingClaimContent, setFetchingClaimContent] = useState(true);
  const [isEventLogOpen, setEventLogOpen] = useState(false);

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      getClaimByID(params.chain, params.contract, params.id).then((data) => {
        setClaim(data);
        setFetchingClaim(false);
      });
    }

    return () => {
      didCancel = true;
    };
  }, [ethereumContext?.graphMetadata?.block?.number]);

  useEffect(() => {
    let didCancel = false;

    if (!didCancel && claim)
      fetch(ipfsGateway + claim.claimID)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }

          return response.json().then((data) =>
            setClaimContent((prevState) => ({
              ...prevState,
              title: data.title,
              description: data.description,
              tags: data.tags,
            }))
          );
        })
        .catch(console.error)
        .then(setFetchingClaimContent(false));

    console.debug(claim && claim);
    console.debug(claimContent && claimContent);

    return () => {
      didCancel = true;
    };

  }, [claim]);

  async function handleInitiateWithdrawal() {
    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.initiateWithdrawal(
      claim.storageAddress
    );
    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log);
  }

  async function handleIncreaseBounty() {
    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.increaseBounty(claim.storageAddress, {
      value: claim.bounty,
    });
    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log);
  }

  async function handleChallenge() {
    const fee = await ethereumContext.contractInstance.challengeFee(claim.storageAddress);

    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.challenge(claim.storageAddress, {
      value: fee,
    });
    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log);
  }

  async function handleSubmitEvidence() {

    let ipfsPathOfNewEvidence
    try {
      const ipfsEndpointResponse = await addToIPFS('https://ipfs.kleros.io/add', "evidence.json", JSON.stringify({
        name: `name`,
        description: `desc`,
        fileURI: `uri`
      }))

      ipfsPathOfNewEvidence = ipfsEndpointResponse[0].hash
    } catch (err) {
      console.error(err)
    }
    console.log(ipfsPathOfNewEvidence)

    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.submitEvidence(claim?.disputes.at(-1).id, `/ipfs/${ipfsPathOfNewEvidence}`);
    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log);
  }

  async function handleExecuteWithdrawal() {
    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.withdraw(claim.storageAddress);
    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log);
  }

  async function handleRevamp() {
    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.initializeClaim(
      claim.claimID,
      claim.category,
      claim.storageAddress,
      {value: "12312312311111"}
    );
    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log);
  }

  let reRenderInMs = 1000;


  return (
    <section>
      <div className={styles.containerKeyMetrics}>
        {claim && (
          <span className={styles.trustScore}>
          {" "}
            Trust Score:{" "}


            {fetchingClaim ? (
              "Fetching claim"
            ) : (
              <Interval delay={reRenderInMs}>
                {() =>
                  getTrustScore(claim, getTimePastSinceLastBountyUpdate(claim?.lastBalanceUpdate, ethereumContext?.graphMetadata?.block?.number || ethereumContext?.blockNumber))
                }
              </Interval>
            )}
        </span>
        )}
        <Tooltip placement="topLeft"
                 title={`Last changed ${getTimePastSinceLastBountyUpdate(claim, ethereumContext?.blockNumber)} blocks ago.`}>

        <span className={styles.bountyAmount}>
          Bounty:{" "}
          {fetchingClaim
            ? "fetching"
            : `${parseFloat(utils.formatUnits(claim?.bounty)).toFixed(3)} ${constants.EtherSymbol}`}{" "}

        </span>
        </Tooltip>
      </div>
      {/*<img className={styles.image}/>*/}

      <div className={styles.containerMetadata}>
        <div>
          <Tooltip placement="left" title={`Pool name: ${ethereumContext?.metaEvidenceContents[claim?.category]?.category}`}>
          <span>
            <b>
              Curation Pool ID: {claim?.category}
            </b>
          </span>
          </Tooltip>

          {claim?.createdAtBlock &&
            <span> Posted on {' '}
              <Tooltip placement="left"
                       title={`Exact block number: ${claim?.createdAtBlock}`}>
              {new Date(parseInt(claim?.createdAtTimestamp) * 1000).toUTCString()}</Tooltip> by <Tooltip
                key={`postedBy${claim?.owner}${ethereumContext?.accounts[0]}`}
                className="blink"
                placement="bottomRight"
                title={claim?.owner}>{fetchingClaim ? "fetching" : getLabel(claim?.owner, ethereumContext?.accounts[0])}</Tooltip>
        </span>}


          {claim?.disputeID && (
            <span>
            Latest {claim?.disputes && `(out of ${claim?.disputes?.length})`} dispute  ID:{" "}
              <a key={claim?.disputeID} className="blink" href={`https://resolve.kleros.io/cases/${claim.disputeID}`} target="_blank"
                 rel="noopener noreferrer">
                {claim?.disputeID}
            </a>
          </span>
          )}
        </div>
        <div>
          <CustomButton modifiers='secondary small'
                        onClick={() => {
                          setEventLogOpen(true);
                        }}
          >
            Event Log
          </CustomButton>
        </div>
      </div>


      <h1 className={styles.title}>
        {!fetchingClaimContent && !claimContent && "⚠️"}{" "}
        {claimContent?.title || (fetchingClaimContent ? "fetching..." : "Failed to fetch claim title.")}{" "}
        {!fetchingClaimContent && !claimContent && "⚠️"}{" "}
      </h1>
      <Pill>{claim?.status}</Pill>

      <p className={styles.description}>
        {" "}
        {claimContent?.description || (fetchingClaimContent ? "fetching..." : "Failed to fetch claim description.")}
      </p>
      <div className={styles.containerTag}>
        {claimContent?.tags?.split(' ').map((tag, index) => <Tag key={index}>{tag}</Tag>)}
      </div>

      <div className={styles.containerButtons}>
        <CustomButton modifiers='secondary'
                      onClick={() => {
                        navigate(-1);
                      }}
        >
          Go back
        </CustomButton>
        {ethereumContext?.accounts[0] == claim?.owner && claim?.status == "Live" && (
          <CustomButton key={`InitiateWithdrawal${claim?.status}`} modifiers="blink" onClick={handleInitiateWithdrawal}>Initiate
            Withdrawal</CustomButton>
        )}
        {ethereumContext?.accounts[0] == claim?.owner && claim?.status == "Live" && (
          <CustomButton key={`DoubleBounty${claim?.status}`} modifiers="blink" onClick={handleIncreaseBounty}>Double the
            Bounty</CustomButton>
        )}
        {ethereumContext?.accounts[0] != claim?.owner && claim?.status == "Live" && (
          <CustomButton key={`ProveItWrong${claim?.status}`} modifiers="blink" onClick={handleChallenge}>Prove it Wrong</CustomButton>
        )}
        {claim?.status == "Challenged" && <CustomButton onClick={handleSubmitEvidence}>Submit Evidence</CustomButton>}

        {ethereumContext?.accounts[0] == claim?.owner && claim?.status == "TimelockStarted" && (
          <CustomButton key={`ExecuteWithdrawal${claim?.status}`} modifiers="blink" onClick={handleExecuteWithdrawal}>
            {getWithdrawalCountdown(claim) > 0 ? (
              <span>
                  You can execute withdrawal in
                  <Interval delay={reRenderInMs}>{() => getWithdrawalCountdown(claim)}</Interval> seconds
                </span>
            ) : (
              "Execute Withdrawal"
            )}
          </CustomButton>
        )}
        {claim?.status == "Withdrawn" && <CustomButton onClick={handleRevamp}>Revamp</CustomButton>}
      </div>
      <SyncStatus syncedBlock={ethereumContext?.graphMetadata?.block?.number} latestBlock={parseInt(ethereumContext?.blockNumber, 16)}
                  subgraphDeployment={ethereumContext?.graphMetadata?.deployment}
                  providerURL={ethereumContext?.ethersProvider?.connection?.url}/>
      {claim?.events &&
        <EventLog style={{background: 'red'}} visible={isEventLogOpen} onCancel={() => setEventLogOpen(false)} events={
          [...claim?.events]?.reverse()
        } activeAddress={ethereumContext?.accounts[0]}>
        </EventLog>
      }
    </section>
  );
}


export const getWithdrawalCountdown = (claim) =>
  Math.max(parseInt(claim.withdrawalPermittedAt) - parseInt(Date.now() / 1000), 0);

