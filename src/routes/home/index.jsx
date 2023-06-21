import * as styles from "./index.module.scss";
import bannerImage from "/src/assets/images/landing-1.jpg";
import WhatSectionImage from "/src/assets/images/landing-3.jpg";
import WhySectionImage from "/src/assets/images/landing-4.jpg";
import HowSectionImage from "/src/assets/images/landing-5.jpg";
import InSearchOfTruth from "/src/assets/images/inSearchOfTruth.jpg";

import Permissionless from "/src/assets/images/permissionless.png";
import Decentralized from "/src/assets/images/decentralized.png";
import Fair from "/src/assets/images/fair.png";
import Pseudonymous from "/src/assets/images/pseudonymous.png";
import Autonomous from "/src/assets/images/autonomous.png";
import Transparent from "/src/assets/images/transparent.png";
import Trustless from "/src/assets/images/trustless.png";

import TruthPost from "jsx:/src/assets/logoBgTransparent.svg";
import FigureDecoration from "jsx:/src/assets/marks.svg";
import Footer from "/src/components/presentational/footer";
import Button from "../../components/presentational/button";

export default function Home() {
  return (
    <>
      <main>
        <article className={styles.home}>
          <TruthPost className={styles.logo} />
          <header>
            <h1>The Truth Post: Reshaping Journalism in the Blockchain Age</h1>
            <p>
              <i>Ushering in a new era of transparency and empowerment with decentralized news curation</i>
            </p>
          </header>
          <section>
            <div className={styles.twoColumn}>
              <p className="initialize">
                Once upon a time, news was a trusted friend. It told us stories about our world, shared the triumphs and
                tragedies of our times, and guided us through the maze of society's happenings. But as the years went
                by, our friend changed. False narratives began to weave their way into the stories, sensational
                headlines overshadowed the important truths, and voices were stifled by the unseen specter of
                auto-censorship. The bond of trust was strained, and many began to wonder - where can we turn for the
                truth?
              </p>
              <p>
                We've witnessed the rampant spread of disinformation, seen the lines between fact and fiction blur in
                our pursuit of the truth. News, once our beacon in the darkness, became a labyrinth of half-truths and
                deception, the sacred trust between the informer and the informed corroded by ulterior motives. We
                yearned for a remedy, a compass to guide us back to trust and truth.
              </p>
              <p>
                And then, the dawn broke over the horizon. An innovation, sparked in the bustling, borderless world of
                the Ethereum blockchain, came to life. A phoenix born from the ashes of mistrust and disinformation,
                The Truth Post ascended, heralding a new age of news curation. Gone were the gatekeepers, the
                centralized authorities that held the keys to information. Justice and transparency took precedence,
                propelled by the gears of decentralization. For the first time, we could publish, curate, and engage
                with the news in a completely transparent environment. The Truth Post created an arena where accuracy
                was not just valued but rewarded, where relevant content found its rightful place in the spotlight. The
                allure of pseudonymous publishing freed us from the shackles of fear and retaliation, encouraging bold
                voices to echo through the corridors of information.
              </p>
            </div>
            <figure>
              <img src={InSearchOfTruth} alt="illustration" />
            </figure>
            <div className={styles.threeColumn}>
              <p>
                The Truth Post utilized the trustless nature of blockchain technology to maintain the integrity of its
                news delivery. As stories are posted, they're not just recorded; they're embedded within the blockchain,
                visible and immutable for all to see. Decentralization provided a new level of freedom: freedom from
                censorship, freedom from skewed narratives, freedom to seek the truth. Each story on The Truth Post
                was put through rigorous fact-checking, made possible by a dedicated community of volunteer curators. Once a story passed these scrutiny layers, it was published on the platform.
                By curating a story, curators increased the visibility of the story within the platform. In return for
                their participation, they earned "Truth Tokens," a crypto asset built on the Ethereum blockchain. These
                "Truth Tokens" weren't just a symbol of participation; they were an empowerment tool. They gave readers
                a direct say in shaping the narrative and choosing the news they deemed important. The tokenomics model
                made it expensive for any individual or group to manipulate the platform, preventing the system from
                being gamed by parties with ulterior motives. The Truth Post put power back in the hands of the
                people, making them active contributors in the global conversation, rather than passive consumers of
                media narratives. Moreover, The Truth Post adopted a pseudonymous publishing model, offering
                journalists the safety to write without fear of repercussions. By not requiring journalists to publish
                under their real names, the platform allowed for the spread of crucial information, even from regions
                with repressive governments. In an age where the echo chambers of social media perpetuated divisive
                narratives, The Truth Post stood as a counterbalance. It provided a beacon of hope and a template for
                future media organizations aiming to regain the public's trust. But the journey had just begun. The true
                test of The Truth Post lay in its ability to not just survive but thrive in a world that had grown
                accustomed to half-truths. The platform had set a new standard for information dissemination, and the
                world was watching. With the hopes of a global community resting on its decentralized shoulders, The
                Truth Post took its first steps into a new age of transparency, truth, and trust. Only time would tell
                how the story would unfold.
              </p>
            </div>
            <em>Let's dive in!</em>
          </section>

          <section className={styles.rightFloating}>
            <h1>
              <b>Right Floating:</b> Notice the right column has a floating image
            </h1>
            <p className="initialize">
              Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism!Get ready for a groundbreaking innovation in journalism! Get ready for a
              groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get
              ready for a groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready
              <figure>
                <img src={WhatSectionImage} alt="truthpost-what-section" />
              </figure>
              for a groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in journalism! Get
              ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism!Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a
              groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism!Get ready
              for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism!
              Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism!Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a
              groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in journalism! Get ready
              for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism!
              Get ready for a groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism!Get ready for a
              groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get
              ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism!Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a
              groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in journalism! Get ready
              for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism!
              Get ready for a groundbreaking innovation in journalism!
            </p>
          </section>
          <section className={styles.principles}>
            <div>
              <figure>
                <img src={Decentralized} />
              </figure>
              <h1>Decentralized</h1>
              <p>
                <i>There's no privileged user group.</i>
              </p>
            </div>
            <div>
              <figure>
                <img src={Pseudonymous} />
              </figure>
              <h1>Pseudonymous</h1>
              <p>
                <i>Allows for reputation building while preventing retaliation.</i>
              </p>
            </div>
            <div>
              <figure>
                <img src={Permissionless} />
              </figure>
              <h1>Permissionless</h1>
              <p>
                <i>Any user can adopt any role within the system.</i>
              </p>
            </div>
            <div>
              <figure>
                <img src={Transparent} />
              </figure>
              <h1>Transparent</h1>
              <p>
                <i>Every aspect of the system can be verified by any user.</i>
              </p>
            </div>
            <div>
              <figure>
                <img src={Fair} />
              </figure>
              <h1>Fair</h1>
              <p>
                <i>Users are rewarded in line with the quality and impact of their contributions.</i>
              </p>
            </div>
            <div>
              <figure>
                <img src={Trustless} />
              </figure>
              <h1>Trustless</h1>
              <p>
                <i>No need to trust any other user.</i>
              </p>
            </div>
            <div>
              <figure>
                <img src={Autonomous} />
              </figure>
              <h1>Autonomous</h1>
              <p>
                <i>The system functions as programmed, indefinitely.</i>
              </p>
            </div>
          </section>
          <section className={styles.twoColumnsMerging}>
            <header>
              <h1>Two Columns Merging into One</h1>
              <p className="initialize">
                Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
                journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
                innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a
                groundbreaking innovation{" "}
              </p>
            </header>
            <figure>
              <img src={WhatSectionImage} alt="truthpost-what-section" />
            </figure>
            <p>
              Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a
              groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get
              ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a
              groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get
              ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism!
            </p>
            <Button>asdasda</Button>
          </section>
          <section className={styles.leftFloating}>
            <h1>
              <b>Left Floating:</b> Notice the left column has a floating image
            </h1>
            <p className="initialize">
              Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism!Get ready for a groundbreaking innovation in journalism! Get ready for a
              groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get
              ready for a groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism!Get ready for a
              groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get
              ready for a groundbreaking innovation in journalism!
              <figure>
                <img src={WhatSectionImage} alt="truthpost-what-section" />
              </figure>
              Get ready for a groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism!Get ready for a
              groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get
              ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism!Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a
              groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in journalism! Get ready
              for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism!
              Get ready for a groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in
              journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism!Get ready for a
              groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get
              ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in
              journalism!Get ready for a groundbreaking innovation in journalism! Get ready for a groundbreaking
              innovation in journalism! Get ready for a groundbreaking innovation in journalism! Get ready for a
              groundbreaking innovation in journalism!Get ready for a groundbreaking innovation in journalism! Get ready
              for a groundbreaking innovation in journalism! Get ready for a groundbreaking innovation in journalism!
              Get ready for a groundbreaking innovation in journalism!
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
