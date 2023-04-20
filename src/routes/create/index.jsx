import { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { EthereumContext } from "../../data/ethereumProvider";
import { utils } from "ethers";

import FormCreate from "/src/components/others/formCreate";
import ConfirmCreate from "/src/components/others/confirmCreate";
import SyncStatus from "/src/components/presentational/syncStatus";

import notifyWithToast, { MESSAGE_TYPE } from "../../utils/notifyWithTost";
import addToIPFS from "../../utils/addToIPFS";

export default function Create() {
  const ethereumContext = useContext(EthereumContext);
  const [createFlowProgress, setCreateFlowProgress] = useState(0);
  const [controlsState, setControlsState] = useState({
    title: "",
    description: "",
    tags: "",
    bounty: "0.001",
    categoryNo: -1,
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
          })
        ),
        MESSAGE_TYPE.ipfs
      );

      ipfsPathOfNewArticle = ipfsEndpointResponse[0].hash;
      console.log(ipfsPathOfNewArticle);

      const formattedBounty = utils.parseEther(controlsState.bounty);

      const unsignedTx = await ethereumContext.contractInstance.populateTransaction.initializeArticle(
        `/ipfs/${ipfsPathOfNewArticle}`,
        controlsState.categoryNo,
        0,
        { value: formattedBounty }
      );

      await notifyWithToast(
        ethereumContext.ethersProvider
          .getSigner()
          .sendTransaction(unsignedTx)
          .then((tx) => tx.wait()),
        MESSAGE_TYPE.transaction
      );
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
      <ToastContainer />
    </section>
  );
}
