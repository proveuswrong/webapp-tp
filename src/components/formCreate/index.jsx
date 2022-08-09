import {useEffect, useState, useContext} from "react";
import {EthereumContext} from "../../data/ethereumProvider";
import * as styles from "./index.module.scss";
import TagEditor from "react-tageditor/lib/TagEditor";
import CustomButton from "/src/components/ui/button";

export default function FormCreate({handleSave, controlsState, updateControlsState}) {

  const ethereumContext = useContext(EthereumContext);

  function handleControlChange(e) {
    updateControlsState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }


  return (
    <>
      <div className={styles.h1}>
        <h1>Report a news</h1>
        <small>Fill up the form to</small>
      </div>
      <label htmlFor='title'>Title</label>
      <input className={`displayBlock ${styles.title}`} type="text" id="title" name="title" required minLength="4"
             placeholder='A Flashy Title' onChange={handleControlChange} value={controlsState.title}/>
      <label htmlFor='description'>Body</label>
      <textarea className={`displayBlock ${styles.description}`} id="description" name="description" rows="5" cols="33"
                placeholder="A juicy description..."
                onChange={handleControlChange} value={controlsState.description}/>
      <label htmlFor='tags'>Tags</label>
      <input className={`displayBlock ${styles.tags}`} type="text" id="tags" name="tags" required minLength="4"
             placeholder='Optionally, add tags and separate them with whitespace.' onChange={handleControlChange}
             value={controlsState.tags}/>
      <div className={styles.others}>
        <div>
          <label htmlFor="bounty">Bounty Amount in ETH: </label>
          <input type="number" id="bounty" name="bounty" min="0.001" max="100.000" step="0.001" placeholder='1.000'
                 onChange={handleControlChange} value={controlsState.bounty}/>
        </div>
        <select id="categoryNo" onChange={handleControlChange} value={controlsState.categoryNo}>
          <option>--Please choose a curation pool--</option>
          {ethereumContext.metaEvidenceContents?.map((item, index) => <option key={index}
                                                                              value={index}
                                                                              label={`${index}: ${item.category}`}/>)}
        </select>
      </div>

      <div className={styles.buttons}>
        <CustomButton onClick={handleSave}>
          Save and Review
        </CustomButton>
      </div>


    </>
  );
}
