import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./index.module.scss";

import ButtonConnect from "/src/components/others/buttonConnect";
import ButtonSelectNetwork from "/src/components/others/buttonSelectNetwork";
import BurgerMenu from "../../presentational/burgerMenu";

import { EthereumContext } from "/src/data/ethereumProvider";
import useScrollLock from "/src/hooks/useScrollLock";

const BREAKPOINT_TABLET = 768;

export default function Header() {
  const ethereumContext = useContext(EthereumContext);
  const [lockScroll, unlockScroll] = useScrollLock();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const navWrapperRef = useRef(null);
  const overlayRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    isMenuOpen ? lockScroll() : unlockScroll();
    return () => {
      unlockScroll();
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const navWrapper = navWrapperRef.current;
      const scrollTop = window.pageYOffset;

      if (navWrapper) {
        const navWrapperTop = navWrapper.getBoundingClientRect().top;
        setIsSticky(scrollTop >= navWrapperTop + 130);
      }
    };

    function handlePositionOverlay() {
      const navWrapper = navWrapperRef.current;
      const overlay = overlayRef.current;

      const topOffset = navWrapper.offsetTop + navWrapper.offsetHeight;
      const borderOffset = 0.5;
      overlay.style.top = `${topOffset + borderOffset}px`;
    }

    function handleResize() {
      if (window.innerWidth >= BREAKPOINT_TABLET) {
        setMenuOpen(false);
      }
      handlePositionOverlay();
    }
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handlePositionOverlay);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handlePositionOverlay);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky && styles.sticky}`}>
      {/*<Logo className={styles.logo}/>*/}
      <h1 className={styles.title}>The Truth Post</h1>
      <hr className={styles.hrBelowLogo} />
      <div className={styles.subtitle}>Accurate and Relevant News</div>
      <hr className={styles.hrBelowSubtitle} />

      <nav className={styles.navWrapper} ref={navWrapperRef}>
        <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
        <div className={styles.nav}>
          <h2 hide="">Navigation</h2>
          <NavLink to={`${ethereumContext?.chainId}/`}>Front Page</NavLink>
          {ethereumContext?.isProviderDetected && <NavLink to={`${ethereumContext?.chainId}/report/`}>Report</NavLink>}
          <NavLink to="faq/">F.A.Q.</NavLink>
          <NavLink to="about/">About</NavLink>
        </div>
        <div className={styles.navEthereum}>
          {ethereumContext?.isProviderDetected && <ButtonConnect />}
          <ButtonSelectNetwork />
        </div>
      </nav>

      <OverlayNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} customRef={overlayRef} />
      <hr />
    </header>
  );
}

function OverlayNav({ isMenuOpen, toggleMenu, customRef }) {
  const ethereumContext = useContext(EthereumContext);
  return (
    <div className={`${styles.overlay} ${isMenuOpen && styles.visible}`} ref={customRef}>
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
      </nav>
    </div>
  );
}
