let events = {
  0: {
    name: "newArticle",
  },
  1: {
    name: "raise",
  },
  2: {
    name: "initiateWithdrawal",
  },
  3: {
    name: "challenge",
  },
  4: {
    name: "appeal",
  },
  5: {
    name: "evidence",
  },
  6: {
    name: "withdrawal",
  },
  7: {
    name: "juryDecision",
  },
  8: {
    name: "debunk",
  },
  9: {
    name: "failedToProveWrong",
  },
};

let arbitrators = {
  0: {
    shortName: "General",
    fullName: "General > Blockchain > Technical",
    feePerVote: 0.025,
    currency: "ETH",
  },
  1: {
    shortName: "Blockchain",
    fullName: "General > Blockchain",
    feePerVote: 0.025,
    currency: "ETH",
  },
  2: {
    shortName: "Non-Technical",
    fullName: "General > Blockchain > Non-Technical",
    feePerVote: 0.025,
    currency: "ETH",
  },
  3: {
    shortName: "Token Listing",
    fullName: "General > Blockchain > Non-Technical > Token Listing",
    feePerVote: 0.07,
    currency: "ETH",
  },
  4: {
    shortName: "Technical",
    fullName: "General > Blockchain > Technical",
    feePerVote: 0.072,
    currency: "ETH",
  },
};


export function getTrustScore(Article) {

  return (
    parseInt(Article.lastCalculatedScore) +
    (Math.floor(Date.now() / 1000) - parseInt(Article.lastBalanceUpdate))
  ).toFixed(0);


}

export function getTrustScore2(Article) {

  return (
    parseInt(Article.lastCalculatedScore) +
    (Math.floor(Date.now() / 1000) - parseInt(Article.lastBalanceUpdate)) * parseInt(Article.bounty)
  ).toFixed(0);


}