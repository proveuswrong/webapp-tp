import { useContext, useState } from "react";
import { EthereumContext } from "../../../data/ethereumProvider";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import Select from "../../presentational/select";
import ErrorIcon from "jsx:/src/assets/error.svg";
import { useMergeState } from "../../../hooks/useMergeState";

const ERROR_MSG = "Please fill up this field";

export default function FormCreate({ handleSave, controlsState, updateControlsState }) {
  const ethereumContext = useContext(EthereumContext);
  const [focusedFields, setFocusedFields] = useMergeState({});
  const [errors, setErrors] = useMergeState({
    title: "",
    description: "",
    categoryNo: "",
  });

  const handleFocus = (field) => {
    setFocusedFields({
      [field]: true,
    });
  };

  const handleBlur = (field) => {
    setFocusedFields({
      [field]: false,
    });
  };

  function handleOnChange(value) {
    updateControlsState({ categoryNo: value });
  }

  const handleRadioChange = (e) => {
    updateControlsState({ [e.target.name]: [e.target.value] });
  };

  const handleControlChange = (e) => {
    updateControlsState({ [e.target.id]: [e.target.value] });
    setErrors({
      [e.target.id]: "",
    });
  };

  const handleSaveAndReview = () => {
    const newErrors = {
      title: controlsState.title === "" ? ERROR_MSG : "",
      description: controlsState.description === "" ? ERROR_MSG : "",
      categoryNo: controlsState.categoryNo < 0 ? "Please select a curation pool" : "",
    };
    console.log({ newErrors });
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    handleSave();
  };

  const selectOptions = ethereumContext.metaEvidenceContents?.map((item, index) => ({
    value: index,
    label: `${index}: ${item.category}`,
  }));

  return (
    <>
      <div className={styles.h1}>
        <h1>Report a news</h1>
        <small>Fill up the form to</small>
      </div>
      <div className={styles.formInput}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className={styles.title}
          required
          minLength="6"
          placeholder="A Flashy Title"
          onChange={handleControlChange}
          onFocus={() => handleFocus("title")}
          onBlur={() => handleBlur("title")}
          value={controlsState.title}
        />
        {(!focusedFields.title || controlsState.title !== "") && <ErrorDisplay message={errors.title} />}
      </div>

      <form>
        <fieldset>

          <input type="radio" id="plaintext" name="format" value="plaintext" onChange={handleRadioChange} checked={controlsState.format == "plaintext"}/>
          <label htmlFor="plaintext">Plaintext</label>
          <br />

          <input type="radio" id="markdown" name="format" value="markdown" onChange={handleRadioChange} checked={controlsState.format == "markdown"}/>
          <label htmlFor="markdown">Markdown</label>
          <br />

        </fieldset>
      </form>

      <div className={styles.formInput}>
        <label htmlFor="description">Body</label>
        <textarea
          className={styles.description}
          id="description"
          name="description"
          rows="5"
          cols="33"
          placeholder="A juicy content..."
          required
          onChange={handleControlChange}
          onFocus={() => handleFocus("description")}
          onBlur={() => handleBlur("description")}
          value={controlsState.description}
        />

        {(!focusedFields.description || controlsState.description !== "") && (
          <ErrorDisplay message={errors.description} />
        )}
      </div>
      <div className={styles.formInput}>
        <label htmlFor="tags">Tags</label>
        <input
          className={`displayBlock ${styles.tags}`}
          type="text"
          id="tags"
          name="tags"
          minLength="4"
          placeholder="Optionally, add tags and separate them with whitespace."
          onChange={handleControlChange}
          value={controlsState.tags}
        />
      </div>
      <div className={styles.others}>
        <div>
          <label htmlFor="bounty">Bounty Amount in ETH: </label>
          <input
            type="number"
            id="bounty"
            name="bounty"
            className={styles.bounty}
            min="0.001"
            max="100.000"
            step="0.001"
            placeholder="1.000"
            onChange={handleControlChange}
            value={controlsState.bounty}
          />
        </div>
        <div className={styles.formSelect}>
          {controlsState.categoryNo < 0 && <ErrorDisplay message={errors.categoryNo} />}
          <Select placeholder="Curation Pool" options={selectOptions} onChange={handleOnChange} />
        </div>
      </div>
      <div className={styles.button}>
        <CustomButton onClick={handleSaveAndReview}>Save and Review</CustomButton>
      </div>
    </>
  );
}

const ErrorDisplay = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      {message && <ErrorIcon />}
      {message}
    </div>
  );
};
