import {NavLink} from "react-router-dom";
import ButtonConnect from "/src/components/buttonConnect";
import ButtonSelectNetwork from "/src/components/buttonSelectNetwork";
import Logo from "jsx:../../assets/logo.svg";

import * as styles from "./index.module.scss";

export default function Header() {
  return (
    <header>
      {/*<Logo className={styles.logo}/>*/}
      <h1 className={styles.title}>The Truth Post</h1>
      <hr className={styles.hrBelowLogo}/>
      <div className={styles.subtitle}>Accurate and Relevant News</div>
      <hr className={styles.hrBelowSubtitle}/>
      <nav className={styles.nav}>
        <h2 hide="">Navigation</h2>
        <NavLink to="/">Home</NavLink>
        <NavLink to="browse/">Browse</NavLink>
        <NavLink to="create/">Create</NavLink>
        <NavLink to="faq/">F.A.Q.</NavLink>
        <div className={styles.navEthereum}>
          <ButtonConnect/>
          <ButtonSelectNetwork/>
        </div>
      </nav>

      <hr/>
    </header>
  );
}
