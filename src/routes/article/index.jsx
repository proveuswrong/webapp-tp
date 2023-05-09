import * as styles from "./index.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import Interval from "react-interval-rerender";
import { EthereumContext, getArticleByID, networkMap } from "/src/data/ethereumProvider";
import addToIPFS, { ipfsGateway } from "/src/utils/addToIPFS";

import { useEffect, useState, useContext } from "react";

import CustomButton from "/src/components/presentational/button";
import EventLog from "/src/components/others/eventLog";
import EvidenceModal from "/src/components/others/evidenceModal";
import SyncStatus from "/src/components/presentational/syncStatus";
import KeyMetrics from "/src/components/others/route_article/keyMetrics";
import Metadata from "/src/components/others/route_article/metadata";
import Content from "/src/components/others/route_article/content";
import ArbitrationDetails from "/src/components/others/route_article/arbitrationDetails";
import BountyModal from "../../components/others/bountyModal";
import notifyWithToast, { MESSAGE_TYPE } from "../../utils/notifyWithTost";

// TODO Refactor out components from this route.
export default function Index() {
  const params = useParams();
  const navigate = useNavigate();

  const ethereumContext = useContext(EthereumContext);
  const [article, setArticle] = useState();
  const [articleContent, setArticleContent] = useState();
  const [fetchingArticle, setFetchingArticle] = useState(true);
  const [fetchingArticleContent, setFetchingArticleContent] = useState(true);
  const [isEventLogOpen, setEventLogOpen] = useState(false);
  const [isEvidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [isBountyModalOpen, setBountyModalOpen] = useState(false);
  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      getArticleByID(params.chain, params.contract, params.id).then((data) => {
        setArticle(data);
        setFetchingArticle(false);
      });
    }

    return () => {
      didCancel = true;
    };
  }, [ethereumContext?.graphMetadata?.block?.number]);

  useEffect(() => {
    if (!params.chain) {
      navigate("/" + Object.keys(networkMap)[0] + "/");
    } else {
      ethereumContext?.changeChain(params.chain);
    }
  });

  useEffect(() => {
    let didCancel = false;

    if (!didCancel && article)
      fetch(ipfsGateway + article.articleID)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }

          return response.json().then((data) =>
            setArticleContent((prevState) => ({
              ...prevState,
              title: data.title,
              description: data.description,
              tags: data.tags,
            }))
          );
        })
        .catch(console.error)
        .then(setFetchingArticleContent(false));

    console.debug(article && article);
    console.debug(articleContent && articleContent);

    return () => {
      didCancel = true;
    };
  }, [article]);

  async function sendTransaction(unsignedTx) {
    return await notifyWithToast(
      ethereumContext.ethersProvider
        .getSigner()
        .sendTransaction(unsignedTx)
        .then((tx) => tx.wait()),
      MESSAGE_TYPE.transaction
    );
  }

  async function handleInitiateWithdrawal() {
    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.initiateWithdrawal(
      article.storageAddress
    );
    await sendTransaction(unsignedTx);
  }

  async function handleChallenge() {
    const fee = await ethereumContext.contractInstance.challengeFee(article.storageAddress);

    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.challenge(article.storageAddress, {
      value: fee,
    });
    await sendTransaction(unsignedTx);
  }

  async function handleExecuteWithdrawal() {
    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.withdraw(article.storageAddress);
    await sendTransaction(unsignedTx);
  }

  async function handleRevamp() {
    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.initializeArticle(
      article.articleID,
      article.category,
      article.storageAddress,
      { value: "12312312311111" }
    );
    await sendTransaction(unsignedTx);
  }

  let reRenderInMs = 1000;
  return (
    <section>
      <KeyMetrics {...{ fetchingArticle, article }} />
      {/*<img className={styles.image}/>*/}
      <Metadata {...{ fetchingArticle, article, setEventLogOpen }} />
      <Content {...{ articleContent, fetchingArticleContent, articleStatus: article?.status }} />
      {article?.disputes?.length > 0 && <ArbitrationDetails article={article} />}

      <div className={styles.containerButtons}>
        <CustomButton
          modifiers="secondary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </CustomButton>
        {ethereumContext?.accounts[0] == article?.owner && article?.status == "Live" && (
          <CustomButton
            key={`InitiateWithdrawal${article?.status}`}
            modifiers="blink"
            onClick={handleInitiateWithdrawal}
          >
            Initiate Withdrawal
          </CustomButton>
        )}

        {ethereumContext?.accounts[0] == article?.owner && article?.status == "Live" && (
          <CustomButton
            key={`DoubleBounty${article?.status}`}
            modifiers="blink"
            onClick={() => setBountyModalOpen(true)}
          >
            Increase Bounty
          </CustomButton>
        )}
        {ethereumContext?.accounts[0] != article?.owner && article?.status == "Live" && (
          <CustomButton key={`ProveItWrong${article?.status}`} modifiers="blink" onClick={handleChallenge}>
            Prove it Wrong
          </CustomButton>
        )}
        {article?.status == "Challenged" && (
          <CustomButton onClick={() => setEvidenceModalOpen(true)}>Submit Evidence</CustomButton>
        )}

        {ethereumContext?.accounts[0] == article?.owner && article?.status == "TimelockStarted" && (
          <CustomButton key={`ExecuteWithdrawal${article?.status}`} modifiers="blink" onClick={handleExecuteWithdrawal}>
            {getWithdrawalCountdown(article) > 0 ? (
              <span>
                You can execute withdrawal in
                <Interval delay={reRenderInMs}>{() => getWithdrawalCountdown(article)}</Interval> seconds
              </span>
            ) : (
              "Execute Withdrawal"
            )}
          </CustomButton>
        )}
        {article?.status == "Withdrawn" && <CustomButton onClick={handleRevamp}>Revamp</CustomButton>}
      </div>
      <SyncStatus
        syncedBlock={ethereumContext?.graphMetadata?.block?.number}
        latestBlock={parseInt(ethereumContext?.blockNumber, 16)}
        subgraphDeployment={ethereumContext?.graphMetadata?.deployment}
        providerURL={ethereumContext?.ethersProvider?.connection?.url}
      />
      {article?.events && (
        <EventLog
          style={{ background: "red" }}
          visible={isEventLogOpen}
          onCancel={() => setEventLogOpen(false)}
          events={[...article?.events]?.reverse()}
          activeAddress={ethereumContext?.accounts[0]}
        ></EventLog>
      )}
      <EvidenceModal
        disputeID={article?.disputes?.at(-1)?.id}
        visible={isEvidenceModalOpen}
        onCancel={() => setEvidenceModalOpen(false)}
      />
      <BountyModal
        articleStorageAddress={article?.storageAddress}
        currentBounty={article?.bounty}
        visible={isBountyModalOpen}
        onCancel={() => setBountyModalOpen(false)}
      />
    </section>
  );
}

export const getWithdrawalCountdown = (article) =>
  Math.max(parseInt(article.withdrawalPermittedAt) - parseInt(Date.now() / 1000), 0);
