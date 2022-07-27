import {useSearchParams, Link} from "react-router-dom";
import ListClaims from "../../components/listClaims";
import {useContext} from "react";
import {EthereumContext} from "../../data/ethereumProvider";
import * as styles from "./index.module.scss";

export default function Browse() {

  const ethereumContext = useContext(EthereumContext);

  return (
    <section className={styles.browse}>
      <ListClaims/>
      <small style={{marginTop: '32px', display: 'block'}}>Last updated at block no: <span
        key={ethereumContext.blockNumber} className="blink">{ethereumContext.blockNumber}</span></small>
    </section>
  );
}

