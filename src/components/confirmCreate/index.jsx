import {useEffect, useState, useContext} from "react";
import {EthereumContext} from "../../data/ethereumProvider";

export default function ConfirmCreate({title, description, bounty, categoryNo, handleCreate, handleGoBack}) {

  const ethereumContext = useContext(EthereumContext);


  return (
    <>
      <input className="displayBlock" type="text" id="title" name="title" required minLength="4" maxLength="36" size="40" disabled
             value={title}
      />
      <textarea className="displayBlock" id="description" name="description" rows="5" cols="33" disabled value={description}/>

      <div>
        <label htmlFor="bounty">Bounty Amount in ETH:</label>

        <input type="number" id="bounty" name="bounty" min="0.001" max="100.000" step="0.001" placeholder='1.000' disabled value={bounty}/>
      </div>

      <div>

        <label htmlFor="selectCategory">Chosen
          arbitration setting: {categoryNo}: {ethereumContext.metaEvidenceContents?.[categoryNo]?.category}</label>


        <div>
          <button type="button" onClick={handleCreate}>
            Prove Me Wrong
          </button>
          <button type="button" onClick={handleGoBack}>
            Go Back And Edit
          </button>
        </div>
      </div>

    </>
  );
}
