import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import ButtonConnect from "/src/components/others/buttonConnect";
import ButtonSelectNetwork from "/src/components/others/buttonSelectNetwork";
import BurgerMenu from "../../presentational/burgerMenu";

import { EthereumContext } from "/src/data/ethereumProvider";
import NotificationCenter from "../notificationCenter";

import useScrollLock from "../../../hooks/useScrollLock";

const DISABLED = true;

const getLinks = (chainId, account) => [
  { name: "Front Page", to: `${chainId}`, display: true },
  { name: "Report", to: `${chainId}/report`, display: account },
  { name: "Account", to: `${chainId}/account/${account}`, display: account },
  { name: "F.A.Q.", to: `https://hackmd.io/@proveuswrong/truth-post`, display: true },
  { name: "About", to: `/`, display: true },
];

export default function Navigation() {
  const { chainId, accounts } = useContext(EthereumContext);
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
          {getLinks(chainId, accounts[0])
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
            {params.chain && <ButtonConnect />}
            {params.chain && <ButtonSelectNetwork />}
          </div>
        )}
      </nav>
      <OverlayNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
}

function OverlayNav({ isMenuOpen, toggleMenu }) {
  const { chainId, accounts } = useContext(EthereumContext);

  return (
    <div className={`withBackground ${styles.overlay} ${isMenuOpen && styles.visible}`}>
      <nav className={`${styles.overlayNav} ${isMenuOpen && styles.visible}`}>
        <h2>Navigation</h2>
        {getLinks(chainId, accounts[0])
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
