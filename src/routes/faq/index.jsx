export default function FAQ() {
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
        What you do is great. I loved it. How do I donate?
        <p>
          First of all, thanks. We build this with love. And we really appreciate your help.
          Please send your contribution <a href="https://etherscan.io/address/0x387e8B40e332831b7a8ad629966df3E9f969C6ad
"> here</a>. </p>
      </li>
    </ol>
  </section>);
}
