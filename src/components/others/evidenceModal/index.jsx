import { useState, useEffect, useContext } from "react";
import { useRevalidator } from "react-router-dom";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import LoadingSpinner from "/src/components/presentational/loadingSpinner";
import Modal from "/src/components/presentational/modal";

import { useSession } from "../../../data/sessionContext";
import addToIPFS from "/src/utils/addToIPFS";
import notifyWithToast, { MESSAGE_TYPE } from "../../../utils/notifyWithTost";

import UploadIcon from "jsx:/src/assets/upload.svg";

const INITIAL_STATE = { title: "", description: "", file: null };
const IPFS_ENDPOINT = "https://ipfs.kleros.io/add";

export default function EvidenceModal({ disputeID, visible, onCancel }) {
  const session = useSession();
  const [controlsState, setControlsState] = useState(INITIAL_STATE);
  const [isDragOver, setIsDragOver] = useState(false);
  const [sumbitSuccess, setSumbitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const revalidator = useRevalidator();

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

      await session.invokeTransaction("submitEvidence", [disputeID, `/ipfs/${ipfsResponse[0].hash}`]);

      setIsSubmitting(false);
      setSumbitSuccess(true);
      onCancel();
      revalidator.revalidate();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
    console.log(ipfsPathOfNewEvidence);
  }

  return (
    <Modal visible={visible} className={styles.evidenceModal} onCancel={onCancel} footer={null}>
      <div className={styles.title}>Submit Evidence</div>
      <label htmlFor="title" className={styles.label}>
        Title
      </label>
      <input
        className={`displayBlock ${styles.evidenceTitle}`}
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
        className={`displayBlock ${styles.evidenceDescription}`}
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
    </Modal>
  );
}
