export const articleFragment = `
    id
    articleID
    owner
    bounty
    category
    status
    lastBalanceUpdate
    createdAtBlock
    createdAtTimestamp
    events (orderBy: timestamp, orderDirection: asc) {
       id
       name
       details
       timestamp
       from
       article{
          bounty
          lastCalculatedScore
          lastBalanceUpdate
       }
    }
    disputes(orderBy: id, orderDirection: asc) {
        id
        ruled
        ruling
        period
        lastPeriodChange
        court{
            id
            policyURI
            hiddenVotes
            timesPerPeriod
        }
        rounds {
            id
            jurySize
            votesPerChoice
            raisedSoFar
            totalToBeRaised
            appealDeadline
            hasPaid
            dispute{
              id
              ruling
            }
        }

    }
    withdrawalPermittedAt
    lastCalculatedScore
    arbitrator{
        id
    }
    arbitratorExtraData
    
`