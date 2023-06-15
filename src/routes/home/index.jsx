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
            Imagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests. With our decentralized newspaper, that dream becomes a reality. Imagine a world where you can
            effortlessly consume distilled information, perfectly tailored to your interests. With our decentralized
            newspaper, that dream becomes a reality. Imagine a world where you can effortlessly consume distilled
            information, perfectly tailored to your interests. With our decentralized newspaper, that dream becomes a
            reality. Imagine a world where you can effortlessly consume distilled information, perfectly tailored to
            your interests. With our decentralized newspaper, that dream becomes a reality. No longer will you be b
          </div>
        </div>
      </section>
      <section className={styles.sectionIntro}>
        <div className={styles.sectionGrid}>
          <div className={styles.banner}>
            <img src={bannerImage} alt="truthpost-banner" />
          </div>
          <div className={styles.text}>
            Imagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests. With our decentralized newspaper, that dream becomes a reality. Imagine a world where you can
            effortlessly consume distilled information, perfectly tailored to your interests. With our decentralized
            newspaper, that dream becomes a reality. Imagine a world where you can effortlessly consume distilled
            information, perfectly tailored to your interests. With our decentralized newspaper, that dream becomes a
            reality. Imagine a world where you can effortlessly consume distilled information, perfectly tailored to
            your interests. With our decentralized newspaper, that dream becomes a reality.
          </div>
        </div>
      </section>

      <section className={styles.sectionWhat}>
        <div className={styles.sectionGrid}>
          <div className={styles.title}>
            <strong>Be Part of the Revolution:</strong> Discover the World's First Decentralized Newspaper
          </div>
          <div className={styles.firstParagraph}>
            Imagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests. With our decentralized newspaper, that dream becomes a reality. No longer will you be bogged
            dImagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests.
          </div>
          <div className={styles.imageWrapper}>
            <img src={WhatSectionImage} alt="truthpost-what-section" />
          </div>
          <div className={styles.secondParagraph}>
            Imagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests. With our decentralized newspaper, that dream becomes a reality. No longer will you be bogged
            dImagine a world where you can effortlessly consume distilled information, perfectly tailored to your
            interests. With our decentralized newspaper, that dream becomes a reality. No longer will you be bogged d
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
