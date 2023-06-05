import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./index.module.scss";

import ButtonConnect from "/src/components/others/buttonConnect";
import ButtonSelectNetwork from "/src/components/others/buttonSelectNetwork";
import BurgerMenu from "../../presentational/burgerMenu";

import { EthereumContext, networkMap } from "/src/data/ethereumProvider";
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

  const links = [
    { name: "Front Page", to: `${ethereumContext?.chainId}/`, display: true },
    { name: "Report", to: `${ethereumContext?.chainId}/report`, display: ethereumContext.accounts[0] },
    {
      name: "Account",
      to: `${ethereumContext}/account/${ethereumContext?.accounts[0]}`,
      display: ethereumContext.accounts[0],
    },
    { name: "F.A.Q.", to: `faq`, display: true },
    { name: "About", to: `about`, display: true },
  ];

  return (
    <>
      <nav className={`withBackground ${styles.navWrapper} ${isMenuOpen ? styles.fixedAtTop : ""} `}>
        <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
        <div className={styles.nav}>
          <h2 hide="">Navigation</h2>
          {links
            .filter((link) => link.display)
            .map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.name}
              </NavLink>
            ))}
        </div>
        {!isMenuOpen && (
          <div className={styles.navEthereum}>
            {!DISABLED && <NotificationCenter />} {/* TODO: unlock when UI design is ready */}
            {ethereumContext?.chainId && ethereumContext?.isProviderDetected && <ButtonConnect />}
            {ethereumContext?.chainId && <ButtonSelectNetwork />}
          </div>
        )}
      </nav>
      <OverlayNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
}

function OverlayNav({ isMenuOpen, toggleMenu }) {
  const ethereumContext = useContext(EthereumContext);

  const links = [
    { name: "Front Page", to: `${ethereumContext?.chainId || Object.keys(networkMap)[0]}/`, display: true },
    {
      name: "Report",
      to: `${ethereumContext?.chainId || Object.keys(networkMap)[0]}/report`,
      display: ethereumContext.accounts[0],
    },
    {
      name: "Account",
      to: `${ethereumContext?.chainId || Object.keys(networkMap)[0]}/account/${ethereumContext?.accounts[0]}`,
      display: ethereumContext.accounts[0],
    },
    { name: "F.A.Q.", to: `faq/`, display: true },
    { name: "About", to: `about/`, display: true },
  ]; // TODO Remove duplication. (Had to duplicate because of Ethereum context dependency.)

  return (
    <div className={`withBackground ${styles.overlay} ${isMenuOpen && styles.visible}`}>
      <nav className={`${styles.overlayNav} ${isMenuOpen && styles.visible}`}>
        <h2>Navigation</h2>
        {links
          .filter((link) => link.display)
          .map((link) => (
            <NavLink key={link.to} to={link.to} onClick={toggleMenu}>
              {link.name}
            </NavLink>
          ))}
      </nav>
    </div>
  );
}
