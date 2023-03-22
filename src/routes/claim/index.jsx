import * as styles from "./index.module.scss";

import CustomButton from "/src/components/ui/button";
import EventLog from "/src/components/eventLog";

import { useParams, useNavigate } from "react-router-dom";
import Interval from "react-interval-rerender";
import { EthereumContext, getClaimByID } from "../../data/ethereumProvider";
import addToIPFS, { ipfsGateway } from "../../utils/addToIPFS";

import { useEffect, useState, useContext } from "react";

import SyncStatus from "../../components/ui/syncStatus";
import KeyMetrics from "./keyMetrics";
import Metadata from "./metadata";
import Content from "./content";
import ArbitrationDetails from "./arbitrationDetails";

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
    let ipfsPathOfNewEvidence;
    try {
      const ipfsEndpointResponse = await addToIPFS(
        "https://ipfs.kleros.io/add",
        "evidence.json",
        JSON.stringify({
          name: `name`,
          description: `desc`,
          fileURI: `uri`,
        })
      );

      ipfsPathOfNewEvidence = ipfsEndpointResponse[0].hash;
    } catch (err) {
      console.error(err);
    }
    console.log(ipfsPathOfNewEvidence);

    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.submitEvidence(
      claim?.disputes.at(-1).id,
      `/ipfs/${ipfsPathOfNewEvidence}`
    );
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
      { value: "12312312311111" }
    );
    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log);
  }

  let reRenderInMs = 1000;

  return (
    <section>
      <KeyMetrics {...{ fetchingClaim, claim }} />
      {/*<img className={styles.image}/>*/}
      <Metadata {...{ fetchingClaim, claim, setEventLogOpen }} />
      <Content {...{ claimContent, fetchingClaimContent, claimStatus: claim?.status }} />
      <ArbitrationDetails />

      <div className={styles.containerButtons}>
        <CustomButton
          modifiers="secondary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </CustomButton>
        {ethereumContext?.accounts[0] == claim?.owner && claim?.status == "Live" && (
          <CustomButton key={`InitiateWithdrawal${claim?.status}`} modifiers="blink" onClick={handleInitiateWithdrawal}>
            Initiate Withdrawal
          </CustomButton>
        )}
        {ethereumContext?.accounts[0] == claim?.owner && claim?.status == "Live" && (
          <CustomButton key={`DoubleBounty${claim?.status}`} modifiers="blink" onClick={handleIncreaseBounty}>
            Double the Bounty
          </CustomButton>
        )}
        {ethereumContext?.accounts[0] != claim?.owner && claim?.status == "Live" && (
          <CustomButton key={`ProveItWrong${claim?.status}`} modifiers="blink" onClick={handleChallenge}>
            Prove it Wrong
          </CustomButton>
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
      <SyncStatus
        syncedBlock={ethereumContext?.graphMetadata?.block?.number}
        latestBlock={parseInt(ethereumContext?.blockNumber, 16)}
        subgraphDeployment={ethereumContext?.graphMetadata?.deployment}
        providerURL={ethereumContext?.ethersProvider?.connection?.url}
      />
      {claim?.events && (
        <EventLog
          style={{ background: "red" }}
          visible={isEventLogOpen}
          onCancel={() => setEventLogOpen(false)}
          events={[...claim?.events]?.reverse()}
          activeAddress={ethereumContext?.accounts[0]}
        ></EventLog>
      )}
    </section>
  );
}

export const getWithdrawalCountdown = (claim) =>
  Math.max(parseInt(claim.withdrawalPermittedAt) - parseInt(Date.now() / 1000), 0);
