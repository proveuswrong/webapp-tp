import { useState, useContext } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import Interval from "react-interval-rerender";
import * as styles from "./index.module.scss";
import { formatTime, getTimeLeft } from "/src/hooks/useCountdown";

import { ipfsGateway } from "/src/utils/addToIPFS";

import CustomButton from "/src/components/presentational/button";
import EventLog from "/src/components/others/eventLog";
import SyncStatus from "/src/components/presentational/syncStatus";
import KeyMetrics from "/src/components/others/route_article/keyMetrics";
import Metadata from "/src/components/others/route_article/metadata";
import Content from "/src/components/others/route_article/content";
import Breadcrumb from "/src/components/presentational/breadcrumb";
import ArbitrationDetails from "/src/components/others/route_article/arbitrationDetails";
import BountyModal from "/src/components/others/bountyModal";
import { EthereumContext, useConnection } from "../../data/ethereumContext";
import { useSession } from "../../data/sessionContext";
import { getArticleByID } from "../../data/api";

export async function loader({ params }) {
  const article = await getArticleByID(params.chain, params.contract, params.id);
  let articleContent = {};
  try {
    const response = await fetch(ipfsGateway + article.articleID);
    if (!response.ok) throw new Error("Network response was not OK");
    articleContent = await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
  return { article, articleContent };
}

export default function Index() {
  const { article, articleContent } = useLoaderData();
  const { state, graphMetadata } = useContext(EthereumContext);
  const connection = useConnection();
  const session = useSession();
  const [isEventLogOpen, setEventLogOpen] = useState(false);
  const [isBountyModalOpen, setBountyModalOpen] = useState(false);
  const revalidator = useRevalidator();

  console.log({ connection, state });
  async function handleInitiateWithdrawal() {
    await session.invokeTransaction("initiateWithdrawal", [article?.storageAddress]);
    revalidator.revalidate();
  }

  async function handleChallenge() {
    const fee = await session.invokeCall("challengeFee", [article.storageAddress]);
    console.log(article.storageAddress);
    await session.invokeTransaction("challenge", [article.storageAddress], { value: fee });
    revalidator.revalidate();
  }

  async function handleExecuteWithdrawal() {
    await session.invokeTransaction("withdraw", [article.storageAddress]);
    revalidator.revalidate();
  }

  let reRenderInMs = 1000;
  return (
    <section>
      <KeyMetrics article={article} />
      {/*<img className={styles.image}/>*/}
      <Metadata article={article} setEventLogOpen={setEventLogOpen} />
      <Breadcrumb items={[{ label: "Browse", linkTo: state.appChainId }, { label: articleContent.title }]} />
      <Content articleContent={articleContent} articleStatus={article.status} />

      <div className={styles.containerButtons}>
        {state.account != article.owner && article.status == "Live" && (
          <CustomButton key={`ProveItWrong${article.status}`} modifiers="blink" onClick={handleChallenge}>
            Prove it Wrong
          </CustomButton>
        )}
        {state.account == article.owner && article.status == "Live" && (
          <CustomButton
            key={`DoubleBounty${article.status}`}
            modifiers="blink"
            onClick={() => setBountyModalOpen(true)}
          >
            Increase Bounty
          </CustomButton>
        )}
        {article.status == "TimelockStarted" && (
          <CustomButton key={`ExecuteWithdrawal${article.status}`} modifiers="blink" onClick={handleExecuteWithdrawal}>
            {getWithdrawalCountdown(article) > 0 ? (
              <span>
                {state.account == article.owner
                  ? "You can unpublish the article in "
                  : "Article can be unpublished in "}
                <Interval delay={reRenderInMs}>
                  {() => (
                    <span className="blink" key={getTimeLeft(article.withdrawalPermittedAt)}>
                      {formatTime(getTimeLeft(article.withdrawalPermittedAt))}
                    </span>
                  )}
                </Interval>
              </span>
            ) : (
              "Unpublish Article"
            )}
          </CustomButton>
        )}
        {state.account == article.owner && article.status == "Live" && (
          <CustomButton
            key={`InitiateWithdrawal${article.status}`}
            modifiers="blink"
            onClick={handleInitiateWithdrawal}
          >
            Initiate Withdrawal
          </CustomButton>
        )}
      </div>
      {article.disputes.length > 0 && <ArbitrationDetails article={article} />}

      <SyncStatus
        syncedBlock={graphMetadata?.block?.number}
        latestBlock={parseInt(state.blockNumber, 16)}
        subgraphDeployment={graphMetadata?.deployment}
        providerURL={connection.currentConnector.name} //TODO: use conntector type instead
      />
      {article.events && (
        <EventLog
          visible={isEventLogOpen}
          onCancel={() => setEventLogOpen(false)}
          events={[...article.events]?.reverse()}
        ></EventLog>
      )}
      <BountyModal
        articleStorageAddress={article.storageAddress}
        currentBounty={article.bounty}
        visible={isBountyModalOpen}
        onCancel={() => setBountyModalOpen(false)}
      />
    </section>
  );
}

export const getWithdrawalCountdown = (article) =>
  Math.max(parseInt(article.withdrawalPermittedAt) - parseInt(Date.now() / 1000), 0);
