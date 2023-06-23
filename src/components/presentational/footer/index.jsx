import Github from "jsx:/src/assets/github.svg";
import Twitter from "jsx:/src/assets/twitter.svg";
import LinkedIn from "jsx:/src/assets/linkedin.svg";
import * as styles from "./index.module.scss";

export default function Index() {
  return (
    <footer className={styles.footer}>
      <span className={`ellipsis ${styles.containerText}`}></span>
      <div className={styles.containerSocialAndCopyright}>
        <span className={styles.social}>
          <a
            href="https://github.com/proveuswrong"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Organization"
          >
            <span style={{ display: "none" }}>Link to GitHub profile</span>
            <Github aria-hidden="true" id="github" />
          </a>
          <a
            href="https://www.linkedin.com/company/prove-us-wrong/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Company Page"
          >
            <span style={{ display: "none" }}>Link to LinkedIn profile</span>
            <LinkedIn aria-hidden="true" id="linkedin" />
          </a>
          <a href="https://twitter.com/ProveUsWrongIO" target="_blank" rel="noopener noreferrer" title="Twitter Page">
            <span style={{ display: "none" }}>Link to Twitter profile</span>
            <Twitter aria-hidden="true" id="twitter" />
          </a>
        </span>
        <a href="https://proveuswrong.io" target="_blank" rel="noopener noreferrer" className={styles.copyright}>
          Copyright {new Date().getFullYear()} Prove Us Wrong
        </a>
      </div>
    </footer>
  );
}
