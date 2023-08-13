import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { isAddress } from "viem";
import * as styles from "./index.module.scss";

import ButtonConnect from "/src/components/others/buttonConnect";
import ButtonSelectNetwork from "/src/components/others/buttonSelectNetwork";
import BurgerMenu from "../../presentational/burgerMenu";

import NotificationCenter from "../notificationCenter";

import useScrollLock from "../../../hooks/useScrollLock";
import { useEthereum } from "../../../data/ethereumContext";
import NetworkStatus from "../networkStatus";

const DISABLED = true;

const getLinks = (chainId, account) => [
  { name: "Front Page", to: `${chainId}`, display: true },
  { name: "Report", to: `${chainId}/report`, display: isAddress(account) },
  { name: "Account", to: `${chainId}/account/${account}`, display: isAddress(account) },
  { name: "F.A.Q.", to: `faq`, display: true },
  { name: "About", to: `/`, display: true },
];

export default function Navigation() {
  const { state } = useEthereum();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [lockScroll, unlockScroll] = useScrollLock();
  const params = useParams();

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
          {getLinks(state.appChainId, state.account)
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
            {params.chain && <NetworkStatus />}
            {params.chain && <ButtonSelectNetwork />}
            {params.chain && <ButtonConnect />}
          </div>
        )}
      </nav>
      <OverlayNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
}

function OverlayNav({ isMenuOpen, toggleMenu }) {
  const { state } = useEthereum();

  return (
    <div className={`withBackground ${styles.overlay} ${isMenuOpen && styles.visible}`}>
      <nav className={`${styles.overlayNav} ${isMenuOpen && styles.visible}`}>
        <h2>Navigation</h2>
        {getLinks(state.chainId, state.account)
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
