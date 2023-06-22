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
              <p className="has-dropped-letter">
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
                the Ethereum blockchain, came to life. A phoenix born from the ashes of mistrust and disinformation, The
                Truth Post ascended, heralding a new age of news curation. Gone were the gatekeepers, the centralized
                authorities that held the keys to information. Justice and transparency took precedence, propelled by
                the gears of decentralization. For the first time, we could publish, curate, and engage with the news in
                a completely transparent environment. The Truth Post created an arena where accuracy was not just valued
                but rewarded, where relevant content found its rightful place in the spotlight. The allure of
                pseudonymous publishing freed us from the shackles of fear and retaliation, encouraging bold voices to
                echo through the corridors of information.
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
                censorship, freedom from skewed narratives, freedom to seek the truth. Each story on The Truth Post was
                put through rigorous fact-checking, made possible by a dedicated community of volunteer curators. By
                curating a story, curators increased the visibility of the story within the platform. In return for
                their participation, they earned truth tokens, a crypto asset built on the Ethereum blockchain. These
                truth tokens weren't just a symbol of participation; they were an empowerment tool. They gave readers a
                direct say in shaping the narrative and choosing the news they deemed important. The tokenomics model
                made it expensive for any individual or group to manipulate the platform, preventing the system from
                being gamed by parties with ulterior motives. The Truth Post put power back in the hands of the people,
                making them active contributors in the global conversation, rather than passive consumers of media
                narratives. Moreover, The Truth Post adopted a pseudonymous publishing model, offering journalists the
                safety to write without fear of repercussions. By not requiring journalists to publish under their real
                names, the platform allowed for the spread of crucial information, even from regions with repressive
                governments. In an age where the echo chambers of social media perpetuated divisive narratives, The
                Truth Post stood as a counterbalance. It provided a beacon of hope and a template for future media
                organizations aiming to regain the public's trust. But the journey had just begun. The true test of The
                Truth Post lay in its ability to not just survive but thrive in a world that had grown accustomed to
                half-truths. The platform had set a new standard for information dissemination, and the world was
                watching. With the hopes of a global community resting on its decentralized shoulders, The Truth Post
                took its first steps into a new age of transparency, truth, and trust. Only time would tell how the
                story would unfold.
              </p>
            </div>
            <em>Enough of stories. Let's dive in!</em>
          </section>
          <section className={styles.twoColumnsMerging}>
            <div>
              <h1>
                <strong>The Truth Post:</strong> Where the Sun of Decentralized Truth Shines Bright, Piercing the
                Shadows and Empowering Voices
              </h1>

              <p>
                The first decentralized newspaper with trustlessly curated articles, powered by Ethereum, Kleros and
                crypto-economic techniques. The incentive mechanism will incentivize authors to publish articles that
                are accurate and relevant to communities' interests. Curators will be incentivized to curate articles
                according to accuracy and relevance, honestly, entirely in a transparent decentralized process. What's
                left for reader is to enjoy distilled information.
              </p>
            </div>
            <a href="/0x1/" className="button small">
              Explore The Truth Post: Unveil the Power of Truth
            </a>
          </section>
          <section className={styles.rightFloating}>
            <h1>
              <strong>Charting New Horizons:</strong> Why The Truth Post is the Beacon We’ve Been Searching For
            </h1>
            <div>
              <p className="has-dropped-letter">
                Our ability to make informed decisions, whether as consumers or as citizens, is fundamental to our
                society. However, the very fabric of this information ecosystem is fraying at an alarming rate.
              </p>
              <p>
                The first culprit is misinformation. Fake news has become a global epidemic, manipulating public opinion
                and, in some cases, even influencing elections. The speed at which these falsehoods spread is
                astounding, and the age-old adage, "a lie can travel halfway around the world while the truth is putting
                on its shoes," has never been more relevant.
              </p>
              <figure>
                <img src={WhatSectionImage} alt="truthpost-what-section" />
              </figure>
              <p>
                Now, let’s talk about centralized control. The majority of media is in the hands of a select few
                conglomerates. This means the diversity of voices and perspectives that are so essential to a balanced
                information landscape are compromised. The agenda is being set not by what’s important, but by what’s
                profitable for these media giants.
              </p>
              <p>
                Moreover, the financial incentives are skewed. Journalists and content creators are often incentivized
                to create sensationalized content to drive clicks and views. The clickbait culture has turned news into
                a volume game rather than a value game.
              </p>
              <p>
                On the other hand, the revenue model is deeply flawed. With intermediaries taking a substantial cut, the
                very individuals dedicated to unearthing and reporting stories are not being adequately compensated for
                their work. This discourages investigative journalism and hampers the growth of emerging talent.
              </p>
              <p>
                Additionally, there’s a lack of accountability. Corrections are buried, and retractions are rare. The
                reputational cost for spreading misinformation is minimal, and the cycle continues.
              </p>
              <p>
                Furthermore, the readers and consumers, who should be at the heart of this ecosystem, are feeling
                increasingly alienated. They’re yearning for a trusted source, for a platform that respects their
                intelligence, and offers them the quality and diversity of content they deserve.
              </p>
              <p>
                The reality is this: the news and information industry is in dire need of innovation. The problems are
                deep-rooted and multifaceted, and a patchwork solution simply won’t cut it. This is a call to action –
                for a comprehensive, groundbreaking approach that addresses these challenges head-on.
              </p>
            </div>
          </section>
          <section className={styles.leftFloating}>
            <h1>
              <strong>Under the Hood:</strong> Deciphering the Ingenuity of The Truth Post’s Mechanisms
            </h1>
            <div>
              <p className="has-dropped-letter">
                In this riveting journey through the information landscape, it's time to delve into the inner workings
                of The Truth Post. Fasten your seatbelts, as we unpack the gears and levers that make this novel
                solution tick.
              </p>

              <p>
                First and foremost, let’s address the backbone of The Truth Post: blockchain technology. By harnessing
                the power of Ethereum, The Truth Post creates an immutable ledger for news articles. Think of this as a
                fortress, one where the articles are stored with their integrity intact, safe from the meddling hands of
                third parties.
              </p>

              <p>
                Next up, let's talk about the valiant knights of this kingdom - the authors and curators. The Truth Post
                introduces an innovative incentive mechanism that rewards accuracy and relevance. Authors are motivated
                not just by passion, but also by tangible rewards to produce quality content. They’re like the bards of
                yore, whose tales are etched into the annals of history (or in this case, the blockchain).
              </p>
              <figure>
                <img src={WhatSectionImage} alt="truthpost-what-section" />
              </figure>
              <p>
                But what about the gatekeepers? Enter the curators. These are the guardians who ensure that the content
                aligns with the noble virtues of truth and relevance. Through a transparent, crowd-sourced process,
                these curators analyze and score articles. Imagine a roundtable, where the knights deliberate and decide
                what news is worthy of being heralded throughout the kingdom.
              </p>

              <p>
                Now, let’s touch upon the cloaks of anonymity. Authors can remain pseudonymous, wielding their quills
                without fear of retribution. This is integral for those who are telling stories that might not sit well
                with the powers that be. With The Truth Post, they can be the voice of the voiceless, the champions of
                truth, without fear.
              </p>

              <p>
                Another golden thread in this tapestry is the direct bridge between authors and readers. Gone are the
                days when the whispers of news pass through a dozen ears before reaching the populace. The Truth Post is
                like a grand stage where the authors speak directly to the audience.
              </p>

              <p>
                And, let’s not forget about the trust scores and the statistical analysis. By employing smart contracts,
                articles are essentially staking their reputation on the line. If an article is debunked, the collateral
                is forfeited. This not only adds an extra layer of accountability but also, through data analysis, gives
                readers insights into the reliability of the information.
              </p>

              <p>
                The Truth Post is akin to a finely tuned orchestra, where each instrument plays a critical role in
                producing the symphony of credible news. From the immutable blockchain records to the incentivized
                community of authors and curators, and the data-driven trust metrics, The Truth Post represents a
                harmony of technology and journalism that aspires to raise the bar in the news industry.
              </p>
            </div>
          </section>
          <section className={styles.principles}>
            <h1>
              <strong>Embodying the Virtues</strong>
              <br /> Key Principles of The Truth Post
            </h1>
            <div>
              <div>
                <figure>
                  <img src={Decentralized} />
                </figure>
                <h2>Decentralized</h2>
                <p>
                  <i>There's no privileged user group.</i>
                </p>
              </div>
              <div>
                <figure>
                  <img src={Pseudonymous} />
                </figure>
                <h2>Pseudonymous</h2>
                <p>
                  <i>Allows for reputation building while preventing retaliation.</i>
                </p>
              </div>
              <div>
                <figure>
                  <img src={Permissionless} />
                </figure>
                <h2>Permissionless</h2>
                <p>
                  <i>Any user can adopt any role within the system.</i>
                </p>
              </div>
              <div>
                <figure>
                  <img src={Transparent} />
                </figure>
                <h2>Transparent</h2>
                <p>
                  <i>Every aspect of the system can be verified by any user.</i>
                </p>
              </div>
              <div>
                <figure>
                  <img src={Fair} />
                </figure>
                <h2>Fair</h2>
                <p>
                  <i>Users are rewarded in line with the quality and impact of their contributions.</i>
                </p>
              </div>
              <div>
                <figure>
                  <img src={Trustless} />
                </figure>
                <h2>Trustless</h2>
                <p>
                  <i>No need to trust any other user.</i>
                </p>
              </div>
              <div>
                <figure>
                  <img src={Autonomous} />
                </figure>
                <h2>Autonomous</h2>
                <p>
                  <i>The system functions as programmed, indefinitely.</i>
                </p>
              </div>
            </div>
          </section>
          <section className={styles.twoColumnsMerging}>
            <div>
              <h1>
                <strong>Unfurl the Banners:</strong> Our Invitation to Join the Crusade as a Valiant Member of the Prove
                Us Wrong Community
              </h1>

              <p>
                Ready to don your armor and embark on this noble quest with Prove Us Wrong? It's time to rally at the
                community’s hearth! Join the vibrant conversation on Discord, where knowledge and camaraderie flow like
                the finest mead. Stay in the loop by following the captivating chronicles on the Prove Us Wrong blog,
                and don’t miss out on the real-time heralding on Twitter. Want to flaunt your alliance in the
                professional arena? Link up on LinkedIn and let your banner fly high. Seize the day, for today you
                become a guardian of truth in a community that's forging the future!
              </p>
            </div>
            <a href="https://discord.gg/FvDrdDtYAV" className="button small">
              Embark on the Crusade: Join Discord
            </a>
          </section>
          <section className={styles.rightFloating}>
            <h1>
              <strong>Prove Us Wrong:</strong> The Vanguard Behind The Truth Post
            </h1>
            <div>
              <p>
                Have you ever wondered what would happen if the passion of cypherpunks and the wisdom of libertarians
                converged to redefine the way we consume information? Behold, Prove Us Wrong – the open-source
                organization spearheading the magnificent quest behind The Truth Post.
              </p>

              <p>
                Prove Us Wrong is an assembly of individuals who trust in the power of decentralized curation. To them,
                curation is akin to a magical multiplier, amplifying productivity and enlightenment. However, in this
                day and age, traditional curation requires an unwavering belief in the honesty and competence of the
                curators. Prove Us Wrong dares to challenge this notion and breathe life into a realm where no such
                assumptions are necessary. The magicians in this order use cutting-edge crypto-economic techniques to
                weave their spells.
              </p>

              <p>
                Identifying as both cypherpunks and libertarians, the members of Prove Us Wrong don the armor of
                freedom, justice, free speech, and privacy. They envision a world where these core values are not mere
                words but the very essence of society. The pursuit of collective good through public interest is a lofty
                aim, yet it is the beating heart of this organization. Like alchemists, they see curation as the
                Philosopher’s Stone – a crucial element in the decision-making that shapes our world.
              </p>

              <p>
                The light that guides Prove Us Wrong through the thickets and shadows is decentralized curation. They
                forge paths and build bridges in their quest for sustainable and censorship-resistant solutions. The
                underlying principle is simple: to make accurate and relevant information not just available but easy to
                access for all. In their own words, they are building the next cool thing – an invitation to the
                skeptics and naysayers to prove them wrong.
              </p>
              <figure>
                <img src={WhatSectionImage} alt="truthpost-what-section" />
              </figure>
              <p>
                And now, dear reader, the trumpets herald your invitation. This is more than just a call to witness a
                revolution; this is your personal summoning to join the ranks of Prove Us Wrong. Whether you wield a
                quill, a ledger, or code, your skills and passions are the very sinews that can bolster this crusade.
                Together, as a united front, we can be the vanguard that heralds a new dawn in information curation.
              </p>

              <p>
                Prove Us Wrong is not just an organization; it’s a movement, a community, and potentially, it’s you.
                Take a step towards transforming the information landscape and join us in our mission to champion
                freedom, truth, and decentralized curation.
              </p>
            </div>
          </section>
          <section className={styles.twoColumnsMerging}>
            <div>
              <h1>
                <strong>Support the Quest:</strong> Donate to the Prove Us Wrong Treasury and Fuel the Pursuit of Truth
              </h1>

              <p>
                As we embark on this ambitious quest to reshape the information landscape, we rely on the support and
                generosity of kindred spirits like you. By donating to the Prove Us Wrong treasury, you become an
                essential patron, fueling our mission to bring truth, transparency, and decentralized curation to the
                world. Join us in this noble endeavor by contributing to our cause and making a lasting impact on the
                future of information.
              </p>
            </div>
            <a href="https://etherscan.io/address/0x387e8B40e332831b7a8ad629966df3E9f969C6ad" className="button small">
              Contribute to the Quest: Donate Now
            </a>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
