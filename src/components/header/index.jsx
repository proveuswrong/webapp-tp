import {NavLink} from "react-router-dom";
import ButtonConnect from "/src/components/buttonConnect";
import ButtonSelectNetwork from "/src/components/buttonSelectNetwork";
import {EthereumContext} from "../../data/ethereumProvider";

import * as styles from "./index.module.scss";
import {useContext} from "react";

export default function Header() {
  const ethereumContext = useContext(EthereumContext)

  return (
    <header>
      {/*<Logo className={styles.logo}/>*/}
      <h1 className={styles.title}>The Truth Post</h1>
      <hr className={styles.hrBelowLogo}/>
      <div className={styles.subtitle}>Accurate and Relevant News</div>
      <hr className={styles.hrBelowSubtitle}/>
      <nav className={styles.nav}>
        <h2 hide="">Navigation</h2>
        <NavLink to={`${ethereumContext?.chainId}/`}>Front Page</NavLink>
        {ethereumContext?.isProviderDetected && <NavLink to={`${ethereumContext?.chainId}/report/`}>Report</NavLink>}
        <NavLink to="faq/">F.A.Q.</NavLink>
        <NavLink to="about/">About</NavLink>
        <div className={styles.navEthereum}>
          {ethereumContext?.isProviderDetected && <ButtonConnect/>}
          <ButtonSelectNetwork/>
        </div>
      </nav>

      <hr/>
    </header>
  );
}
