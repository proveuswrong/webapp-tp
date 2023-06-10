import * as styles from "./index.module.scss";
import bannerImage from "/src/assets/images/landing-1.jpg";
import heroImage from "/src/assets/images/landing-2.png";
import WhatSectionImage from "/src/assets/images/landing-3.jpg";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <img src={bannerImage} alt="puw-banner" />
        </div>

        <div className={styles.intro}>
          <h1>The World's First Decentralized Newspaper</h1>
          <p>
            We are an open-source organization working on curation solutions in which there is no honesty or competency
            assumption, utilizing state-of-the-art crypto-economic techniques.
          </p>
          <div className={styles.slogan}>Let's dive into an Era of Trust and Transparency! </div>
        </div>
      </div>

      <div className={styles.hero}>
        <img src={heroImage} alt="puw-hero" />
      </div>

      <div className={`${styles.container}`}>
        <div className={`${styles.section}`}>
          <div className={styles.title}>What</div>
          <hr />
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <p>
                -The first decentralized newspaper with trustless and transparent curation, powered by Kleros's
                decentralized dispute resolution system.
              </p>
              <p>
                -The incentive mechanism will incentivize reporters to make news that resonates with communities'
                interests and is fake-free and curators are incentivized to curate important content honestly.
              </p>
              <p>-What's left for consumers is to enjoy consuming distilled information.</p>
              <p>
                -All happening in a credibly neutral decentralized process thanks to decentralized dispute resolution
                and game theory.
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <img src={WhatSectionImage} alt="puw-what-section" />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.container}`}>
        <div className={`${styles.section} ${styles.reverse}`}>
          <div className={styles.title}>Why</div>
          <hr />
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <p>
                -The right to access information and freedom of speech is not honored enough by the news we have now.
              </p>
              <p>-To incentivize news that is aligned with readers' interests.</p>
              <p>-Fake news is a problem and centralized fact-checking is another problem.</p>
              <p>-Intermediaries are taking lion's share of news reporting revenues.</p>
            </div>
            <div className={styles.imageWrapper}>
              <img src={WhatSectionImage} alt="puw-what-section" />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.container}`}>
        <div className={`${styles.section}`}>
          <div className={styles.title}>How</div>
          <hr />
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <p>
                -Pseudonymized: reporters can remain pseudonymous to exercise freedom of speech without risks of
                retaliation.
              </p>
              <p>-Incentivized: reporters are incentivized to report relevant news.</p>
              <p>-Credibly-neutral: fact-checking and curation is decentralized, eliminating trust requirement.</p>
              <p>-Direct: reporters deliver directly to reader, no intermediaries to feed.</p>
            </div>
            <div className={styles.imageWrapper}>
              <img src={WhatSectionImage} alt="puw-what-section" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
