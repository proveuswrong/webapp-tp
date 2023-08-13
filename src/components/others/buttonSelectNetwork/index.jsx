import React from "react";

import Select from "/src/components/presentational/select";
import { useConnection, useEthereum } from "../../../data/ethereumContext";
import { networkMap } from "../../../connectors/networks";

export default function ButtonSelectNetwork() {
  const { state } = useEthereum();
  const connection = useConnection();

  const selectOptions = Object.entries(networkMap).map(([chainId, props]) => ({
    value: chainId,
    label: props.shortname,
  }));

  return (
    <div style={{ marginRight: "10px" }}>
      <Select
        options={selectOptions}
        placeholder={networkMap[state.appChainId].shortname}
        onChange={(chain) => connection.switchAppChain(chain)}
      />
    </div>
  );
}
