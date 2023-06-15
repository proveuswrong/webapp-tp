import * as styles from "./index.module.scss";
import bannerImage from "/src/assets/images/landing-1.jpg";
import WhatSectionImage from "/src/assets/images/landing-3.jpg";
import WhySectionImage from "/src/assets/images/landing-4.jpg";
import HowSectionImage from "/src/assets/images/landing-5.jpg";

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.sectionHero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContainer}>
            <div className={styles.content}>
              <div className={styles.title}>Ushering in a New Era of Trust and Transparency</div>
              <div className={styles.subTitle}>Get ready for a groundbreaking innovation in journalism! </div>
            </div>
          </div>
          <div className={styles.text}>
            The Truth Post is an innovative project designed to offer a platform where reporters, readers, and curators can engage in the reporting, reading, and curation of articles in a trustless environment. By leveraging cryptoeconomic techniques and decentralized dispute resolution, the platform aims to guarantee the provision of accurate and relevant news articles. Moreover, it offers reporters the opportunity to publish articles pseudonymously and earn rewards commensurate with their contributions’ impact.
          </div>
        </div>
      </section>
      <section className={styles.sectionIntro}>
        <div className={styles.sectionGrid}>
          <div className={styles.banner}>
            <img src={bannerImage} alt="truthpost-banner" />
          </div>
          <div className={styles.text}>
            The Truth Post empowers users with a permissionless, pseudonymous, trustless, transparent, decentralized, autonomous, and fair ecosystem. With our innovative platform, anyone can publish, read, or curate news articles, ensuring an egalitarian space that rewards quality and impact.
          </div>
        </div>
      </section>

      <section className={styles.sectionWhat}>
        <div className={styles.sectionGrid}>
          <div className={styles.title}>
            <strong>Be Part of the Revolution:</strong> Discover the World's First Decentralized Newspaper
          </div>
          <div className={styles.firstParagraph}>
            At The Truth Post, everyone has a role to play. Authors can freely express their narratives, readers can enjoy distilled information, and curators can maintain the quality and relevance of content. Each user role is intricately woven into our platform’s fabric, fostering an environment that rewards contributions based on their merit.
          </div>
          <div className={styles.imageWrapper}>
            <img src={WhatSectionImage} alt="truthpost-what-section" />
          </div>
          <div className={styles.secondParagraph}>
            We deploy cryptoeconomic incentives to cultivate a fair, quality-driven platform. Authors are rewarded based on the trust and relevance scores of their articles, incentivizing accurate and relevant news reporting. Curators, on the other hand, are motivated to challenge article accuracy and assign fair relevance scores with potential rewards and penalties.
          </div>
        </div>
      </section>

      <section className={styles.sectionWhy}>
        <div className={styles.sectionGrid}>
          <div className={styles.title}>Ushering in a New Era of Trust and Transparency</div>
          <div className={styles.secondTitle}>
            <strong>Reclaim the Truth:</strong> Why Our Decentralized News is the Answer
          </div>
          <div className={styles.firstParagraph}>
            Imagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests. With our decentralized newspaper, that dream becomes a reality. No longer will you be bogged
            dImagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests.
          </div>
          <div className={styles.imageWrapper}>
            <img src={WhySectionImage} alt="truthpost-why-section" />
          </div>
          <div className={styles.secondParagraph}>
            Imagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests. With our decentralized newspaper, that dream becomes a reality. No longer will you be bogged
            dImagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests. With our decentralized newspaper, that dream becomes a reality. No longer will you be bogged d
          </div>
        </div>
      </section>

      <section className={styles.sectionHow}>
        <div className={styles.sectionGrid}>
          <div className={styles.title}>Ushering in a New Era of Trust and Transparency</div>
          <div className={styles.subtitle}>Get ready for a groundbreaking innovation in journalism!</div>
          <div className={styles.text}>
            Imagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests. With our decentralized newspaper, that dream becomes a reality. Imagine a world where you can
            effortlessly consume distilled information, perfectly tailored to your interests. With our decentralized
            newspaper, that dream becomes a reality. Imagine a world where you can effortlessly consume distilled
            information, perfectly tailored to your interests. With our decentralized newspaper, that dream becomes a
            reality. Imagine a world where you can effortlessly consume distilled information, perfectly tailored to
            your interests. With our decentralized newspaper, that dream becomes a reality.
          </div>
          <div className={styles.imageWrapper}>
            <img src={HowSectionImage} alt="truthpost-how-section" />
          </div>
        </div>
      </section>
    </div>
  );
}
