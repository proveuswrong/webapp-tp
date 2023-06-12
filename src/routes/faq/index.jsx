import { EthereumContext, networkMap } from "../../data/ethereumProvider";
import { useContext, useEffect } from "react";

export default function FAQ() {
  const ethereumContext = useContext(EthereumContext);

  return (<section>
    <ol>
      <li>
        What is <i>trust score</i>?
        <p>
          Trust score is the key metric for the likelihood of an item being accurate. The bigger the trust score is, the more likely the
          item being accurate.
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
      <li>
        How much <i>trust score</i> is trustable enough?
        <p>
          Depends. We leave interpretation to readers. In future, when we have enough dataset, we plan to give statistical estimates based
          on past
          events.
        </p>
      </li>
      <li>
        What happens if an article gets challenged?
        <p>
          Challenger pays the arbitration fee (plus 1.5625% tax) of Kleros jury and a dispute between challenger and the author gets
          created. After each side submit evidence, jury will be asked whether the article is accurate and will decide according to the
          rules of the respective court, rules of the Truth Post and evidence presented.</p>

        <p>
          There are three possible outcomes:
          <ul>
            <li>Tie</li>
            <li>Author wins</li>
            <li>Challenger wins</li>
          </ul>
        </p>
        <p>
          In case of tie or author wins, the security deposit remains and the article goes back to <i>live</i> state. In case challenger
          wins, article gets debunked and the deposit is awarded to the challenger.
        </p>
      </li>
      <li>
        How exactly the arbitration works?
        <p>
          Arbitration relies on <a href="https://kleros.io">Kleros protocol</a>.

          Kleros protocol is a decentralized dispute resolution system, where disputants can get their disputes resolved fast, cheap, fair
          and transparently. Each dispute is assigned to a subcourt in Kleros Court and a random jury gets assigned to each dispute round.

          A dispute round consists of five different periods, with respective order:
        </p>
        <p>
          <ol>
            <li>evidence</li>
            <li>commit</li>
            <li>voting</li>
            <li>appeal</li>
            <li>execution</li>
          </ol>
        </p>
        <p>A dispute starts with evidence period when each sides submit their evidence and arguments, also in this round, Kleros Court
          randomly assigns a jury.</p>

        <p>In commit period, jury cast their votes hiddenly. If the relevant subcourt is not supporting hidden votes then this period will
          automatically be skipped.</p>

        <p>In voting period, jury reveal their votes (or simply cast their votes, if commit period was skipped). If all jury casts their
          votes, the period can be passed before the deadline.</p>

        <p>In appeal period, disputants have the opportunity to review and appeal the jury decision.</p>

        <p>Things to note:</p>
        <ul>
          <li>
            Appealing in favor of winning ruling option is cheaper and the deadline is longer. This is because to prevent appeal wars.
          </li>
          <li>Appeal funding is actually a crowdfunding. So anyone can contribute to funding, not necessarily disputants. The incentive is
            that the ruling option that is contributed to wins the dispute, contributor receives back the contribution plus a reward. Return
            of investment ratio depends on last rounds jury decision, so it's potentially more profitable to fund for last rounds winner.
          </li>
          <li>Incomplete funding contributions are refunded.</li>
          <li>If only one ruling option is funded, this ruling option wins by default.</li>
          <li>If two ruling options gets funded, a new dispute round starts with a jury size of twice as big and dispute goes into evidence
            period again.
          </li>
          <li>Finally, the execution period starts if no appeal happens in appeal period. This is the period when the consequences of
            arbitration are executed. If challenger wins, executing the arbitration decision will transfer the security deposit to the
            challenger and mark the article as <i>debunked</i>.</li>
        </ul>


<p>
      There is much more going on behind the scenes: for example, there is a crypto-economic game going on between jury members during a
      dispute to ensure fair outcomes. For sake of conciseness we won't explain all the inner mechanics of Kleros protocol here. Should you
      want to know more, people take a look at <a href="https://kleros.gitbook.io/docs/">Kleros protocol documentation</a>.</p>

    </li>
    <li>
      Will there be a token?
      <p>
        Yes. Relevance curation solution involves a token.
      </p>
    </li>
    <li>
      What you do is great. I loved it. How do I donate?
      <p>
        First of all, thanks. We build this with love. And we really appreciate your help.
        Please send your contribution <a href="https://etherscan.io/address/0x387e8B40e332831b7a8ad629966df3E9f969C6ad
"> here</a>. </p>
    </li>
  </ol>
</section>)
  ;
}
