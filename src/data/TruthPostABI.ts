export const TruthPostAbi = [
  {
    inputs: [
      {
        internalType: "contract IArbitrator",
        name: "_arbitrator",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_arbitratorExtraData",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "_metaevidenceIpfsUri",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_articleWithdrawalTimelock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_winnerStakeMultiplier",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_loserStakeMultiplier",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "articleAddress",
        type: "uint256",
      },
    ],
    name: "ArticleWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "articleAddress",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newTotal",
        type: "uint256",
      },
    ],
    name: "BalanceUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "articleAddress",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "challanger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "disputeID",
        type: "uint256",
      },
    ],
    name: "Challenge",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "disputeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "round",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ITruthPost.RulingOptions",
        name: "ruling",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Contribution",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "articleAddress",
        type: "uint256",
      },
    ],
    name: "Debunked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IArbitrator",
        name: "_arbitrator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_metaEvidenceID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_evidenceGroupID",
        type: "uint256",
      },
    ],
    name: "Dispute",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IArbitrator",
        name: "_arbitrator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_evidenceGroupID",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_party",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_evidence",
        type: "string",
      },
    ],
    name: "Evidence",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_metaEvidenceID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_evidence",
        type: "string",
      },
    ],
    name: "MetaEvidence",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "articleID",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "category",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "articleAddress",
        type: "uint256",
      },
    ],
    name: "NewArticle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IArbitrator",
        name: "_arbitrator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_ruling",
        type: "uint256",
      },
    ],
    name: "Ruling",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "disputeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "round",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "enum ITruthPost.RulingOptions",
        name: "ruling",
        type: "uint8",
      },
    ],
    name: "RulingFunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "articleAddress",
        type: "uint256",
      },
    ],
    name: "TimelockStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "disputeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "round",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ITruthPost.RulingOptions",
        name: "ruling",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "ARBITRATOR",
    outputs: [
      {
        internalType: "contract IArbitrator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ARTICLE_WITHDRAWAL_TIMELOCK",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOSER_APPEAL_PERIOD_MULTIPLIER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOSER_STAKE_MULTIPLIER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MULTIPLIER_DENOMINATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NUMBER_OF_LEAST_SIGNIFICANT_BITS_TO_IGNORE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NUMBER_OF_RULING_OPTIONS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WINNER_STAKE_MULTIPLIER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
    ],
    name: "appealFee",
    outputs: [
      {
        internalType: "uint256",
        name: "arbitrationFee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
    ],
    name: "articleStorage",
    outputs: [
      {
        internalType: "address payable",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "withdrawalPermittedAt",
        type: "uint32",
      },
      {
        internalType: "uint56",
        name: "bountyAmount",
        type: "uint56",
      },
      {
        internalType: "uint8",
        name: "category",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyAndBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "categoryCounter",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "categoryToArbitratorExtraData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_articleStorageAddress",
        type: "uint80",
      },
    ],
    name: "challenge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_articleStorageAddress",
        type: "uint80",
      },
    ],
    name: "challengeFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "challengeTaxRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_newAdmin",
        type: "address",
      },
    ],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "disputes",
    outputs: [
      {
        internalType: "address payable",
        name: "challenger",
        type: "address",
      },
      {
        internalType: "enum ITruthPost.RulingOptions",
        name: "outcome",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "articleCategory",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "resolved",
        type: "bool",
      },
      {
        internalType: "uint80",
        name: "articleStorageAddress",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_searchPointer",
        type: "uint80",
      },
    ],
    name: "findVacantStorageSlot",
    outputs: [
      {
        internalType: "uint256",
        name: "vacantSlotIndex",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "enum ITruthPost.RulingOptions",
        name: "_supportedRuling",
        type: "uint8",
      },
    ],
    name: "fundAppeal",
    outputs: [
      {
        internalType: "bool",
        name: "fullyFunded",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "enum ITruthPost.RulingOptions",
        name: "_ruling",
        type: "uint8",
      },
    ],
    name: "getAmountRemainsToBeRaised",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "enum ITruthPost.RulingOptions",
        name: "_ruling",
        type: "uint8",
      },
    ],
    name: "getAppealPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
    ],
    name: "getLastRoundWinner",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ITruthPost.RulingOptions",
        name: "_ruling",
        type: "uint8",
      },
      {
        internalType: "enum ITruthPost.RulingOptions",
        name: "_lastRoundWinner",
        type: "uint8",
      },
    ],
    name: "getReturnOfInvestmentRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_round",
        type: "uint256",
      },
    ],
    name: "getRoundInfo",
    outputs: [
      {
        internalType: "bool[3]",
        name: "hasPaid",
        type: "bool[3]",
      },
      {
        internalType: "uint256[3]",
        name: "totalPerRuling",
        type: "uint256[3]",
      },
      {
        internalType: "uint256",
        name: "totalClaimableAfterExpenses",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_contributor",
        type: "address",
      },
    ],
    name: "getTotalWithdrawableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "sum",
        type: "uint256",
      },
      {
        internalType: "uint256[][]",
        name: "amounts",
        type: "uint256[][]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_articleStorageAddress",
        type: "uint80",
      },
    ],
    name: "increaseBounty",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_articleID",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_category",
        type: "uint8",
      },
      {
        internalType: "uint80",
        name: "_searchPointer",
        type: "uint80",
      },
    ],
    name: "initializeArticle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_articleStorageAddress",
        type: "uint80",
      },
    ],
    name: "initiateWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_metaevidenceIpfsUri",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "_arbitratorExtraData",
        type: "bytes",
      },
    ],
    name: "newCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ruling",
        type: "uint256",
      },
    ],
    name: "rule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_evidenceURI",
        type: "string",
      },
    ],
    name: "submitEvidence",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_articleStorageAddress",
        type: "uint80",
      },
      {
        internalType: "address payable",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasuryBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newChallengeTaxRate",
        type: "uint256",
      },
    ],
    name: "updateChallengeTaxRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_articleStorageAddress",
        type: "uint80",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_contributor",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_roundNumber",
        type: "uint256",
      },
      {
        internalType: "enum ITruthPost.RulingOptions",
        name: "_ruling",
        type: "uint8",
      },
    ],
    name: "withdrawFeesAndRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_contributor",
        type: "address",
      },
      {
        internalType: "enum ITruthPost.RulingOptions",
        name: "_ruling",
        type: "uint8",
      },
    ],
    name: "withdrawFeesAndRewardsForAllRounds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_contributor",
        type: "address",
      },
    ],
    name: "withdrawFeesAndRewardsForAllRoundsAndAllRulings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_disputeID",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_contributor",
        type: "address",
      },
      {
        internalType: "uint256[][]",
        name: "positions",
        type: "uint256[][]",
      },
    ],
    name: "withdrawFeesAndRewardsForGivenPositions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
