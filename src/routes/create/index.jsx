import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { utils } from "ethers";

import FormCreate from "/src/components/others/formCreate";
import ConfirmCreate from "/src/components/others/confirmCreate";
import SyncStatus from "/src/components/presentational/syncStatus";

import notifyWithToast, { MESSAGE_TYPE } from "../../utils/notifyWithTost";
import addToIPFS from "../../utils/addToIPFS";
import { useMergeState } from "../../hooks/useMergeState";
import { EthereumContext, useEthereum } from "../../data/ethereumContext";
import { useSession } from "../../data/sessionContext";
import { getLastArticleByAuthor } from "../../data/api";

export default function Create() {
  const { state, graphMetadata } = useEthereum();
  const session = useSession();
  const navigate = useNavigate();

  const [createFlowProgress, setCreateFlowProgress] = useState(0);
  const [controlsState, setControlsState] = useMergeState({
    title: "",
    description: "",
    tags: "",
    bounty: "0.001",
    categoryNo: -1,
    format: "plaintext",
  });

  function handleSave() {
    setCreateFlowProgress(1);
  }

  async function handleCreate() {
    let ipfsPathOfNewArticle;
    try {
      const ipfsEndpointResponse = await notifyWithToast(
        addToIPFS(
          "https://ipfs.kleros.io/add",
          "article.json",
          JSON.stringify({
            title: controlsState.title,
            description: controlsState.description,
            tags: controlsState.tags.trim(),
            format: controlsState.format,
          })
        ),
        MESSAGE_TYPE.ipfs
      );

      ipfsPathOfNewArticle = ipfsEndpointResponse[0].hash;

      const formattedBounty = utils.parseEther(controlsState.bounty);
      const vacantStorageSlot = await session.invokeCall("findVacantStorageSlot", [0]);

      await session.invokeTransaction(
        "initializeArticle",
        [`/ipfs/${ipfsPathOfNewArticle}`, controlsState.categoryNo, vacantStorageSlot],
        {
          value: formattedBounty,
        }
      );

      const article = await getLastArticleByAuthor(state.appChainId, state.account); // TODO: You can use article
      // storage
      // address from tx, and block number from tx to compute this.
      navigate(`/${state.appChainId}/${article?.contractAddress}/${article?.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  function handleGoBack() {
    setCreateFlowProgress(0);
  }

  return (
    <section>
      {createFlowProgress === 0 && (
        <FormCreate handleSave={handleSave} controlsState={controlsState} updateControlsState={setControlsState} />
      )}
      {createFlowProgress === 1 && (
        <ConfirmCreate
          title={controlsState.title}
          description={controlsState.description}
          tags={controlsState.tags}
          bounty={controlsState.bounty}
          categoryNo={controlsState.categoryNo}
          format={controlsState.format}
          handleCreate={handleCreate}
          handleGoBack={handleGoBack}
        />
      )}
      <SyncStatus
        syncedBlock={graphMetadata?.block?.number}
        latestBlock={parseInt(state.blockNumber, 16)}
        subgraphDeployment={graphMetadata?.deployment}
        providerURL="Metamask" //TODO: use connector type instead
      />
    </section>
  );
}
