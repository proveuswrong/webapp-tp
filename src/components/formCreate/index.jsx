import {useEffect, useState, useContext} from "react";
import {EthereumContext} from "../../data/ethereumProvider";

export default function FormCreate({handleSave, controlsState, updateControlsState}) {

  const ethereumContext = useContext(EthereumContext);

  function handleControlChange(e) {
    updateControlsState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };


  return (
    <>
      <input className="displayBlock" type="text" id="title" name="title" required minLength="4" maxLength="100" size="50"
             placeholder='A Flashy Title' onChange={handleControlChange} value={controlsState.title}/>
      <textarea className="displayBlock" id="description" name="description" rows="5" cols="33" placeholder="A juicy description..."
                onChange={handleControlChange} value={controlsState.description}/>

      <div>
        <label htmlFor="bounty">Bounty Amount in ETH:</label>

        <input type="number" id="bounty" name="bounty" min="0.001" max="100.000" step="0.001" placeholder='1.000'
               onChange={handleControlChange} value={controlsState.bounty}/>
      </div>

      <div>
        <select id="categoryNo" onChange={handleControlChange} value={controlsState.categoryNo}>
          <option>--Please choose an arbitration setting--</option>
          {ethereumContext.metaEvidenceContents?.map((item, index) => <option key={index}
                                                                              value={index}
                                                                              label={`${index}: ${item.category}`}/>)}
        </select>

        <div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

    </>
  );
}
