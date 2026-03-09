import { commonQueries } from "./graphql/queries";

export const environment = {
  networkMap: {
    "0x1": {
      default: true,
      deployments: {
        "0x87aade1067ed0276ec9bef6db8e17abe27a6b454": {
          subgraph: {
            endpoint: "https://api.studio.thegraph.com/query/88965/thetruthpost/version/latest",
            queries: commonQueries,
          },
        },
      },
    },
  },
};
