import { useState, useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { EthereumContext } from "/src/data/ethereumProvider";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import LoadingSpinner from "/src/components/presentational/loadingSpinner";
import Modal from "/src/components/presentational/modal";

import addToIPFS from "/src/utils/addToIPFS";
import notifyWithToast, { MESSAGE_TYPE } from "../../../utils/notifyWithTost";

import UploadIcon from "jsx:/src/assets/upload.svg";

const INITIAL_STATE = { title: "", description: "", file: null };
const IPFS_ENDPOINT = "https://ipfs.kleros.io/add";

export default function EvidenceModal({ disputeID, visible, onCancel }) {
  const ethereumContext = useContext(EthereumContext);
  const [controlsState, setControlsState] = useState(INITIAL_STATE);
  const [isDragOver, setIsDragOver] = useState(false);
  const [sumbitSuccess, setSumbitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (sumbitSuccess) {
      setControlsState(INITIAL_STATE);
      setSumbitSuccess(false);
    }
  }, [sumbitSuccess]);

  function handleControlChange(e) {
    setControlsState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function handleFileChange(e) {
    setControlsState((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  }

  function handleDragEnter(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);

    setControlsState((prevState) => ({
      ...prevState,
      file: e.dataTransfer.files[0],
    }));
  }

  function handleClick() {
    document.getElementById("file").click();
  }

  async function handleSubmitEvidence() {
    let ipfsPathOfNewEvidence;
    setIsSubmitting(true);
    try {
      const fileBuffer = await controlsState.file.arrayBuffer();

      const ipfsResponse = await notifyWithToast(
        addToIPFS(IPFS_ENDPOINT, "evidence-file", fileBuffer).then((res) =>
          addToIPFS(
            IPFS_ENDPOINT,
            "evidence.json",
            JSON.stringify({
              name: controlsState.title,
              description: controlsState.description,
              fileURI: `/ipfs/${res[0].hash}`,
            })
          )
        ),
        MESSAGE_TYPE.ipfs
      );

      const unsignedTx = await ethereumContext.contractInstance.populateTransaction.submitEvidence(
        disputeID,
        `/ipfs/${ipfsResponse[0].hash}`
      );

      await notifyWithToast(
        ethereumContext.ethersProvider
          .getSigner()
          .sendTransaction(unsignedTx)
          .then((tx) => tx.wait()),
        MESSAGE_TYPE.transaction
      );

      setIsSubmitting(false);
      setSumbitSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
    console.log(ipfsPathOfNewEvidence);
  }

  return (
    <Modal visible={visible} className={styles.evidenceModal} onCancel={onCancel} footer={null}>
      <h1>Submit Evidence</h1>
      <label htmlFor="title" className={styles.label}>
        Title
      </label>
      <input
        className={`displayBlock ${styles.title}`}
        type="text"
        id="title"
        name="title"
        required
        minLength="4"
        placeholder="Evidence Title"
        onChange={handleControlChange}
        value={controlsState.title}
      />

      <label htmlFor="description" className={styles.label}>
        Description
      </label>
      <textarea
        className={`displayBlock ${styles.description}`}
        id="description"
        name="description"
        rows="5"
        cols="33"
        placeholder="Evidence desciption"
        onChange={handleControlChange}
        value={controlsState.description}
      />

      <div className={styles.fileUpload}>
        <label htmlFor="file">Drag and drop an image, or Browse</label>
        <div
          className={`${styles.fileUploadArea} ${isDragOver && styles.dragOver}`}
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadIcon />
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        {controlsState.file && <div>{controlsState.file.name}</div>}
      </div>

      <div className={styles.button}>
        <CustomButton onClick={handleSubmitEvidence}>{isSubmitting ? <LoadingSpinner /> : "Submit"}</CustomButton>
      </div>
      <ToastContainer />
    </Modal>
  );
}

const messageTemplates = {
  ipfs: {
    pending: "Adding file to IPFS...",
    success: (data) => (
      <div>
        <div>File added to IPFS successfully</div>
        <a target="_blank" href={`https://ipfs.kleros.io/ipfs/${data.hash}`}>
          view
        </a>
      </div>
    ),
    error: "Error while adding file to IPFS",
  },
  transaction: {
    pending: "Sending transaction...",
    success: ({ data }) => (
      <div>
        <div>Transaction mined successfully!</div>
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${data.transactionHash}`}>
          View on Etherscan
        </a>
      </div>
    ),
    error: {
      render({ data }) {
        console.log({ data });
        if (data.code === 4001) return "User denied transaction";
        return "Failed to execute transaction";
      },
    },
  },
  // add more message types here as needed
};
