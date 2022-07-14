import { useParams, useNavigate, useLocation } from "react-router-dom";
import Interval from "react-interval-rerender";
import { EthereumContext, getClaimByID } from "../data/ethereumProvider";
import { ipfsGateway } from "../utils/addToIPFS";
import { useEffect, useState, useContext } from "react";

import { utils, constants, BigNumber } from "ethers";

export default function Claim() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const ethereumContext = useContext(EthereumContext);
  const [claim, setClaim] = useState();
  const [claimContent, setClaimContent] = useState();
  const [fetchingClaim, setFetchingClaim] = useState(true);
  const [fetchingClaimContent, setFetchingClaimContent] = useState(true);

  console.log(claim);

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
  }, [ethereumContext.blockNumber]);

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
            }))
          );
        })
        .catch(console.error)
        .then(setFetchingClaimContent(false));

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
      value: constants.Two.mul(claim.bounty),
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

  console.log(claim && getWithdrawalCountdown(claim));

  return (
    <section>
      <div>
        <h3>
          {!fetchingClaimContent && !claimContent && "⚠️"}{" "}
          {claimContent?.title || (fetchingClaimContent ? "fetching..." : "Failed to fetch claim title.")}{" "}
          {!fetchingClaimContent && !claimContent && "⚠️"}{" "}
        </h3>
        <p>
          Category: {claim?.category}: {ethereumContext?.metaEvidenceContents[claim?.category]?.category}
        </p>
        <p>
          Status:{" "}
          <span key={claim?.status} className="blink">
            {claim?.status}
          </span>
        </p>
        {claim?.disputeID && (
          <p>
            Dispute ID:{" "}
            <a href={`https://resolve.kleros.io/cases/${claim.disputeID}`} target="_blank" rel="noopener noreferrer">
              <span key={claim?.disputeID} className="blink">
                {claim?.disputeID}
              </span>
            </a>
          </p>
        )}
        {/*We need to get arbitrator address somehow. Last thing I tried is to add this field to Claim Entity on Subgraph. See 0.0.19*/}
        {/*<p>Arbitrator Short Name: {claim.category.arbitrator.shortName}</p>*/}
        {/*<p>Arbitrator Long Name: {claim.category.arbitrator.fullName}</p>*/}
        {/*<p>Arbitrator Fee: {claim.category.arbitrator.shortName}</p>*/}
        {/*<p>*/}
        {/*  Arbitration Fee: {(claim.category.arbitrator.feePerVote * claim.category.jurySize).toFixed(3)}{" "}*/}
        {/*  {claim.category.arbitrator.currency}*/}
        {/*</p>*/}
        {/*<p>Jury Size: {claim.category.jurySize} votes</p>*/}
        <p>
          {" "}
          {claimContent?.description || (fetchingClaimContent ? "fetching..." : "Failed to fetch claim description.")}
        </p>
        <p>
          Bounty amount is{" "}
          {fetchingClaim
            ? "fetching"
            : `${parseFloat(utils.formatUnits(claim?.bounty)).toFixed(3)} ${constants.EtherSymbol}`}{" "}
          and it was updated{" "}
          {fetchingClaim ? (
            "fetching"
          ) : (
            <span key={getTimePastSinceLastBountyUpdate(claim, ethereumContext.blockNumber)} className="blink">
              {" "}
              {getTimePastSinceLastBountyUpdate(claim, ethereumContext.blockNumber)}
            </span>
          )}{" "}
          blocks ago
        </p>

        <p>Reporter: {fetchingClaim ? "fetching" : claim?.owner}</p>
        {claim && (
          <p>
            {" "}
            Trust Score:{" "}
            <big>
              <b>
                {fetchingClaim ? (
                  "Fetching claim"
                ) : (
                  <Interval delay={reRenderInMs}>
                    {() =>
                      getTrustScore(claim, getTimePastSinceLastBountyUpdate(claim, ethereumContext.blockNumber)).slice(
                        0,
                        -3
                      )
                    }
                  </Interval>
                )}
              </b>
            </big>
            <Interval delay={reRenderInMs}>
              {() =>
                getTrustScore(claim, getTimePastSinceLastBountyUpdate(claim, ethereumContext.blockNumber)).slice(-3)
              }
            </Interval>
          </p>
        )}
        <p>
          <button
            onClick={() => {
              navigate("/browse" + location.search);
            }}
          >
            Go back
          </button>
          {ethereumContext.accounts[0] == claim?.owner && claim?.status == "Live" && (
            <button onClick={handleInitiateWithdrawal}>Initiate Withdrawal</button>
          )}
          {ethereumContext.accounts[0] == claim?.owner && claim?.status == "Live" && (
            <button onClick={handleIncreaseBounty}>Double Bounty</button>
          )}
          {ethereumContext.accounts[1] != claim?.owner && claim?.status == "Live" && (
            <button onClick={handleChallenge}>Prove it Wrong</button>
          )}
          {ethereumContext.accounts[0] == claim?.owner && claim?.status == "TimelockStarted" && (
            <button onClick={handleExecuteWithdrawal}>
              {getWithdrawalCountdown(claim) > 0 ? (
                <span>
                  You can execute withdrawal in
                  <Interval delay={reRenderInMs}>{() => getWithdrawalCountdown(claim)}</Interval> seconds
                </span>
              ) : (
                "Execute Withdrawal"
              )}
            </button>
          )}
          {claim?.status == "Withdrawn" && <button onClick={handleRevamp}>Revamp</button>}
        </p>
      </div>
      <small key={ethereumContext.blockNumber} style={{ marginTop: "auto" }}>
        Component rendered at block no: <span className="blink">{ethereumContext.blockNumber}</span>
      </small>
    </section>
  );
}

export const getTimePastSinceLastBountyUpdate = (claim, currentBlockNumber) =>
  parseInt(currentBlockNumber) - parseInt(claim?.lastBalanceUpdate);

export const getWithdrawalCountdown = (claim) =>
  Math.max(parseInt(claim.withdrawalPermittedAt) - parseInt(Date.now() / 1000), 0);

export const getTrustScore = (claim, timePastSinceLastBountyUpdate) => {
  const timeDelta = BigNumber.from(timePastSinceLastBountyUpdate);
  const previouslyAccumulatedScore = BigNumber.from(claim.lastCalculatedScore);
  const bounty = BigNumber.from(claim.bounty);
  const rawScore = previouslyAccumulatedScore.add(timeDelta.mul(bounty));
  const normalizedScore = utils.formatEther(rawScore); // Divides by 10^18 to prevent big numbers.
  return parseInt(normalizedScore).toFixed(0);
};
