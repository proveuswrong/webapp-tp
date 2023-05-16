import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./index.module.scss";

import ButtonConnect from "/src/components/others/buttonConnect";
import ButtonSelectNetwork from "/src/components/others/buttonSelectNetwork";
import BurgerMenu from "../../presentational/burgerMenu";

import { EthereumContext } from "/src/data/ethereumProvider";
import useScrollLock from "/src/hooks/useScrollLock";
import NotificationCenter from "../notificationCenter";

import TruthPost from "jsx:/src/assets/tp.svg";

const DISABLED = true;

export default function Header() {
  const ethereumContext = useContext(EthereumContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const navWrapperRef = useRef(null);
  const overlayRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);


  return (
    <>
      <header className={`${styles.header} ${isSticky && styles.sticky}`}>
        <TruthPost />
        <div className={styles.subtitleContainer}>
          <div className={styles.subtitle}>Accurate and Relevant News</div>
          <hr className={styles.hrBelowSubtitle} />
          <div className={styles.subtitleDate}>{new Date().toUTCString().slice(0, 16)}</div>
        </div>
      </header>
      <nav className={`withBackground ${styles.navWrapper}`} ref={navWrapperRef}>
        <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
        <div className={styles.nav}>
          <h2 hide="">Navigation</h2>
          <NavLink to={`${ethereumContext?.chainId}/`}>Front Page</NavLink>
          {ethereumContext?.isProviderDetected && <NavLink to={`${ethereumContext?.chainId}/report/`}>Report</NavLink>}
          <NavLink to="faq/">F.A.Q.</NavLink>
          <NavLink to="about/">About</NavLink>
          <NavLink to={`${ethereumContext?.chainId}/account/${ethereumContext?.accounts[0]}`}>Account</NavLink>
        </div>
        <div className={styles.navEthereum}>
          {!DISABLED && <NotificationCenter />} {/* TODO: unlock when UI design is ready */}
          {ethereumContext?.isProviderDetected && <ButtonConnect />}
          <ButtonSelectNetwork />
        </div>
      </nav>

      <OverlayNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} customRef={overlayRef} />
    </>
  );
}

function OverlayNav({ isMenuOpen, toggleMenu, customRef }) {
  const ethereumContext = useContext(EthereumContext);
  return (
    <div className={`withBackground ${styles.overlay} ${isMenuOpen && styles.visible}`} ref={customRef}>
      <nav className={`${styles.overlayNav} ${isMenuOpen && styles.visible}`}>
        <h2>Navigation</h2>
        <NavLink to={`${ethereumContext?.chainId}/`} onClick={toggleMenu}>
          Front Page
        </NavLink>
        {ethereumContext?.isProviderDetected && (
          <NavLink to={`${ethereumContext?.chainId}/report/`} onClick={toggleMenu}>
            Report
          </NavLink>
        )}
        <NavLink to="faq/" onClick={toggleMenu}>
          F.A.Q.
        </NavLink>
        <NavLink to="about/" onClick={toggleMenu}>
          About
        </NavLink>
        <NavLink to={`${ethereumContext?.chainId}/account/${ethereumContext?.accounts[0]}`} onClick={toggleMenu}>
          Account
        </NavLink>
      </nav>
    </div>
  );
}
