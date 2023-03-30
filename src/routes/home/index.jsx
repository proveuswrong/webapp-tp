import * as styles from "./index.module.scss";

export default function Home() {
  return (<section className={styles.home}>
    <h1>What</h1>
    <p>The first decentralized newspaper with trustless and transparent curation, powered by <a
      href='https://kleros.io' target='_blank' rel='noopener noreferrer'>Kleros</a>'s decentralized dispute resolution system. The incentive
      mechanism will incentivize reporters to make news that resonates with communities' interests and is fake-free and curators are
      incentivized to curate important content honestly. All happening in a credibly neutral decentralized process thanks to decentralized
      dispute resolution and game theory. What's left for consumers is to enjoy consuming distilled information.</p>
    <h1>Why</h1>
    <ol>
      <li>The right to access information and freedom of speech is not honored enough by the news we have now.
      </li>
      <li>To incentivize news that is aligned with readers' interests.
      </li>
      <li>Fake news is a problem and centralized fact-checking is another problem.
      </li>
      <li>Intermediaries are taking lion's share of news reporting revenues.
      </li>
    </ol>
    <h1>How</h1>
    <ol>
      <li>Pseudonymized: reporters can remain pseudonymous to exercise freedom of speech without risks of retaliation.
      </li>
      <li>Incentivized: reporters are incentivized to report relevant news.
      </li>
      <li>Credibly-neutral: fact-checking and curation is decentralized, eliminating trust requirement.
      </li>
      <li>Direct: reporters deliver directly to reader, no intermediaries to feed.
      </li>
    </ol>
    <h1>Status</h1>
    <p>
      We develop publicly. This is a work-in-progress, and by no means is it ready. Not even a beta.
    </p>

    <p>Contributions are welcome. Find us on <a href="https://github.com/proveuswrong">Github</a>, or <a
      href="https://discord.gg/FvDrdDtYAV">Discord</a>.</p>
  </section>);
}
