import styles from "./index.module.scss"
import {useState, useContext} from "react";
import {EthereumContext} from "../../data/ethereumProvider";
import FormCreate from "/src/components/formCreate";
import ConfirmCreate from "/src/components/confirmCreate";
import addToIPFS from "../../utils/addToIPFS";
import {utils} from "ethers";


export default function Create() {
  const ethereumContext = useContext(EthereumContext);
  const [createFlowProgress, setCreateFlowProgress] = useState(0)
  const [controlsState, setControlsState] = useState({title: '', description: '', bounty: 0.001, categoryNo: -1})


  function handleSave() {
    setCreateFlowProgress(1)
  }

  async function handleCreate() {

    let ipfsPathOfNewClaim
    try {
      const ipfsEndpointResponse = await addToIPFS('https://ipfs.kleros.io/add', "claim.json", JSON.stringify({
        title: controlsState.title,
        description: controlsState.description
      }))

      ipfsPathOfNewClaim = ipfsEndpointResponse[0].hash
    } catch (err) {
      console.error(err)
    }

    const formattedBounty = utils.parseEther(controlsState.bounty)

    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.initializeClaim(`/ipfs/${ipfsPathOfNewClaim}`, controlsState.categoryNo, 0, {value: formattedBounty})

    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log)
  }

  function handleGoBack() {
    setCreateFlowProgress(0)
  }


  return (
    <section>
      <h1>Create</h1>
      {createFlowProgress === 0 &&
        <FormCreate handleSave={handleSave} controlsState={controlsState} updateControlsState={setControlsState}/>}
      {createFlowProgress === 1 &&
        <ConfirmCreate title={controlsState.title} description={controlsState.description} bounty={controlsState.bounty}
                       categoryNo={controlsState.categoryNo} handleCreate={handleCreate}
                       handleGoBack={handleGoBack}/>}
      <small style={{marginTop: '32px', display: 'block'}}>Last updated at block no: <span key={ethereumContext.blockNumber}
                                                                                           className='blink'>{ethereumContext.blockNumber}</span></small>
    </section>

  );
}
