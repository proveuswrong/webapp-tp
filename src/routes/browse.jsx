import {useSearchParams, Link} from "react-router-dom";
import ListClaims from "../components/listClaims";
import {useContext} from "react";
import {EthereumContext} from "../data/ethereumProvider";

export default function Browse() {

  const ethereumContext = useContext(EthereumContext);

  return (
    <section>
      <ListClaims/>
      <small style={{marginTop: '32px', display: 'block'}}>Last updated at block no: <span
        key={ethereumContext.blockNumber} className="blink">{ethereumContext.blockNumber}</span></small>
    </section>
  );
}

