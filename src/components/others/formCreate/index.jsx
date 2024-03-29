import { useContext } from "react";
import { EthereumContext } from "../../../data/ethereumProvider";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import Select from "../../presentational/select";
import RadioButtons from "../../presentational/radioButtons";

import { useMergeState } from "../../../hooks/useMergeState";
import ErrorIcon from "jsx:/src/assets/error.svg";

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
    updateControlsState({ [e.target.name]: e.target.value });
  };

  const handleControlChange = (e) => {
    const { id, value } = e.target;
    updateControlsState({ [id]: id === "tags" ? value.toLowerCase() : value });
    setErrors({
      [id]: "",
    });
  };

  const handleSaveAndReview = () => {
    const newErrors = {
      title: controlsState.title === "" ? ERROR_MSG : "",
      description: controlsState.description === "" ? ERROR_MSG : "",
      categoryNo: controlsState.categoryNo < 0 ? "Please select a curation pool" : "",
    };
    console.debug({ newErrors });
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

      <div>
        <div className={styles.formInput}>
          <label htmlFor="description">Body</label>
          <textarea
            className={styles.description}
            id="description"
            name="description"
            rows="10"
            cols="33"
            placeholder="A juicy content..."
            required
            onChange={handleControlChange}
            onFocus={() => handleFocus("description")}
            onBlur={() => handleBlur("description")}
            value={controlsState.description}
          />
        </div>
        {(!focusedFields.description || controlsState.description !== "") && (
          <ErrorDisplay message={errors.description} />
        )}
      </div>

      <RadioButtons
        options={[
          { label: "plaintext", value: "plaintext" },
          { label: "markdown", value: "markdown" },
        ]}
        defaultValue={controlsState.format}
        onChange={handleRadioChange}
        name="format"
      />

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
          <Select
            placeholder="Curation Pool"
            options={selectOptions}
            defaultOption={selectOptions.find((item) => item.value === controlsState.categoryNo)}
            onChange={handleOnChange}
          />
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
