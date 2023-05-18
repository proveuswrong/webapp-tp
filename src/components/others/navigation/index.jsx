import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./index.module.scss";

import ButtonConnect from "/src/components/others/buttonConnect";
import ButtonSelectNetwork from "/src/components/others/buttonSelectNetwork";
import BurgerMenu from "../../presentational/burgerMenu";

import { EthereumContext } from "/src/data/ethereumProvider";
import NotificationCenter from "../notificationCenter";

import useScrollLock from "../../../hooks/useScrollLock";

const DISABLED = true;

export default function Navigation() {
  const ethereumContext = useContext(EthereumContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [lockScroll, unlockScroll] = useScrollLock();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    isMenuOpen ? lockScroll() : unlockScroll();
    return () => {
      unlockScroll();
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`withBackground ${styles.navWrapper} ${isMenuOpen ? styles.fixedAtTop : ""} `}>
        <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
        <div className={styles.nav}>
          <h2 hide="">Navigation</h2>
          <NavLink to={`${ethereumContext?.chainId}/`}>Front Page</NavLink>
          {ethereumContext?.isProviderDetected && <NavLink to={`${ethereumContext?.chainId}/report/`}>Report</NavLink>}
          <NavLink to="faq/">F.A.Q.</NavLink>
          <NavLink to="about/">About</NavLink>
          <NavLink to={`${ethereumContext?.chainId}/account/${ethereumContext?.accounts[0]}`}>Account</NavLink>
        </div>
        {!isMenuOpen && (
          <div className={styles.navEthereum}>
            {!DISABLED && <NotificationCenter />} {/* TODO: unlock when UI design is ready */}
            {ethereumContext?.isProviderDetected && <ButtonConnect />}
            <ButtonSelectNetwork />
          </div>
        )}
      </nav>

      <OverlayNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
}

function OverlayNav({ isMenuOpen, toggleMenu }) {
  const ethereumContext = useContext(EthereumContext);
  return (
    <div className={`withBackground ${styles.overlay} ${isMenuOpen && styles.visible}`}>
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
