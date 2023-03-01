import {useState, useContext} from "react";
import {EthereumContext} from "../../data/ethereumProvider";
import FormCreate from "/src/components/formCreate";
import ConfirmCreate from "/src/components/confirmCreate";
import addToIPFS from "../../utils/addToIPFS";
import {utils} from "ethers";
import SyncStatus from "../../components/ui/syncStatus";


export default function Create() {
  const ethereumContext = useContext(EthereumContext);
  const [createFlowProgress, setCreateFlowProgress] = useState(0)
  const [controlsState, setControlsState] = useState({
    title: '',
    description: '',
    tags: '',
    bounty: '0.001',
    categoryNo: -1
  })


  function handleSave() {
    setCreateFlowProgress(1)
  }

  async function handleCreate() {

    let ipfsPathOfNewClaim
    try {
      const ipfsEndpointResponse = await addToIPFS('https://ipfs.kleros.io/add', "claim.json", JSON.stringify({
        title: controlsState.title,
        description: controlsState.description,
        tags: controlsState.tags
      }))

      ipfsPathOfNewClaim = ipfsEndpointResponse[0].hash
    } catch (err) {
      console.error(err)
    }
    console.log(ipfsPathOfNewClaim)

    const formattedBounty = utils.parseEther(controlsState.bounty)

    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.initializeClaim(`/ipfs/${ipfsPathOfNewClaim}`, controlsState.categoryNo, 0, {value: formattedBounty})

    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log)
  }

  function handleGoBack() {
    setCreateFlowProgress(0)
  }


  return (
    <section>

      {createFlowProgress === 0 &&
        <FormCreate handleSave={handleSave} controlsState={controlsState} updateControlsState={setControlsState}/>}
      {createFlowProgress === 1 &&
        <ConfirmCreate title={controlsState.title} description={controlsState.description} tags={controlsState.tags}
                       bounty={controlsState.bounty}
                       categoryNo={controlsState.categoryNo} handleCreate={handleCreate}
                       handleGoBack={handleGoBack}/>}
      <SyncStatus syncedBlock={ethereumContext?.graphMetadata?.block?.number} latestBlock={parseInt(ethereumContext?.blockNumber, 16)}
                  subgraphDeployment={ethereumContext?.graphMetadata?.deployment}
                  providerURL={ethereumContext?.ethersProvider?.connection?.url}/>
    </section>

  );
}
