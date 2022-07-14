import Github from "jsx:../../assets/github.svg";
import Twitter from "jsx:../../assets/twitter.svg";
import LinkedIn from "jsx:../../assets/linkedin.svg";
import * as styles from "./index.module.scss";

export default function Index() {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerText}>This is a work-in-progress. Expect broken functionality and many bugs.</div>
      <div className={styles.containerSocial}>
        <a href="https://github.com/proveuswrong" target="_blank" rel="noopener noreferrer" title="GitHub Organization">
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
      </div>
    </footer>
  );
}
