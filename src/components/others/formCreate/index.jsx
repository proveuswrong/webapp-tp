import { useContext } from "react";
import { EthereumContext } from "../../../data/ethereumProvider";
import * as styles from "./index.module.scss";
import CustomButton from "/src/components/presentational/button";
import Select from "../../presentational/select";

export default function FormCreate({ handleSave, controlsState, updateControlsState }) {
  const ethereumContext = useContext(EthereumContext);

  function handleControlChange(e) {
    updateControlsState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function handleOnSelect(value) {
    updateControlsState((prevState) => ({
      ...prevState,
      categoryNo: value,
    }));
  }

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
      <label htmlFor="title">Title</label>
      <input
        className={`displayBlock ${styles.title}`}
        type="text"
        id="title"
        name="title"
        required
        minLength="4"
        placeholder="A Flashy Title"
        onChange={handleControlChange}
        value={controlsState.title}
      />
      <label htmlFor="description">Body</label>
      <textarea
        className={`displayBlock ${styles.description}`}
        id="description"
        name="description"
        rows="5"
        cols="33"
        placeholder="A juicy content..."
        onChange={handleControlChange}
        value={controlsState.description}
      />
      <label htmlFor="tags">Tags</label>
      <input
        className={`displayBlock ${styles.tags}`}
        type="text"
        id="tags"
        name="tags"
        required
        minLength="4"
        placeholder="Optionally, add tags and separate them with whitespace."
        onChange={handleControlChange}
        value={controlsState.tags}
      />
      <div className={styles.others}>
        <div>
          <label htmlFor="bounty">Bounty Amount in ETH: </label>
          <input
            type="number"
            id="bounty"
            name="bounty"
            min="0.001"
            max="100.000"
            step="0.001"
            placeholder="1.000"
            onChange={handleControlChange}
            value={controlsState.bounty}
          />
        </div>
        <Select defaultValue="Curation Pool" options={selectOptions} onSelect={handleOnSelect} />
      </div>

      <div className={styles.buttons}>
        <CustomButton onClick={handleSave}>Save and Review</CustomButton>
      </div>
    </>
  );
}
