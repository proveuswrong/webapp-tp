import * as styles from "./index.module.scss";
import TrustScore from "jsx:../../assets/trustScoreFormula.svg";

export default function FAQ() {
  return (<section>
    <ol>
      <li>
        What is <i>trust score</i>?
        <p>
          Trust score is a key metric for the likelihood of an item being inaccurate. The bigger the trust score is, the less likely the
          item being inaccurate.
        </p>
      </li>
      <li>
        How do you calculate <i>trust scores</i>?
        <p>
          Trust score is a linear function of time and bounty amount. Items accumulate it in <i>Live</i> and <i>Challenged</i> states,
          respect
          to
          their bounty amounts. There is a linear relationship between accumulation speed and bounty amount; for example, if you double the
          bounty amount, accumulation speed is also gets doubled. Trust score is a sum, of time intervals multiplied by bounty amounts in
          given invervals.
        </p>
      </li>
      <li>
        How much <i>trust score</i> is trustable enough?
        <p>
          Depends. We leave interpretation to readers. In future, when we have enough dataset, we plan to give statistical estimates based
          on past
          events.
        </p>
      </li>
    </ol>
  </section>);
}
