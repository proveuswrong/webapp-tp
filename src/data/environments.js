export default {
  prod: {
    networkMap: {
      "0x5": {
        contractInstances: {
          "0x0136ed2132Ec1e99046889058F67c9C2fd5FD578": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/proveuswrong/thetruthpost",
            }
          },
        },
      },
    }
  },
  dev: {
    networkMap: {
      "0x5": {
        contractInstances: {
          "0xAA51402316075798040c2322D0361383577707ba": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/gratestas/thetruthpost-test-goerli",
            }
          },
        },
      },
    }
  },


};