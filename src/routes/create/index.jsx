import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { utils } from "ethers";

import FormCreate from "/src/components/others/formCreate";
import ConfirmCreate from "/src/components/others/confirmCreate";
import SyncStatus from "/src/components/presentational/syncStatus";

import { EthereumContext, getLastArticleByAuthor } from "../../data/ethereumProvider";
import notifyWithToast, { MESSAGE_TYPE } from "../../utils/notifyWithTost";
import addToIPFS from "../../utils/addToIPFS";
import { useMergeState } from "../../hooks/useMergeState";

export default function Create() {
  const ethereumContext = useContext(EthereumContext);
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
            tags: controlsState.tags,
            format: controlsState.format,
          })
        ),
        MESSAGE_TYPE.ipfs
      );

      ipfsPathOfNewArticle = ipfsEndpointResponse[0].hash;
      console.log(ipfsPathOfNewArticle);

      const formattedBounty = utils.parseEther(controlsState.bounty);
      const vacantStorageSlot = await ethereumContext.invokeCall("findVacantStorageSlot", [0]);

      await ethereumContext.invokeTransaction(
        "initializeArticle",
        [`/ipfs/${ipfsPathOfNewArticle}`, controlsState.categoryNo, vacantStorageSlot],
        formattedBounty
      );

      const article = await getLastArticleByAuthor(ethereumContext.chainId, ethereumContext.accounts[0]); // TODO: You can use article
      // storage
      // address from tx, and block number from tx to compute this.
      navigate(`/${ethereumContext.chainId}/${article?.contractAddress}/${article?.id}`);
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
        syncedBlock={ethereumContext?.graphMetadata?.block?.number}
        latestBlock={parseInt(ethereumContext?.blockNumber, 16)}
        subgraphDeployment={ethereumContext?.graphMetadata?.deployment}
        providerURL={ethereumContext?.ethersProvider?.connection?.url}
      />
    </section>
  );
}
