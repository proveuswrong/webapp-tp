import React, { useContext } from "react";

import Select from "/src/components/presentational/select";
import { EthereumContext, networkMap } from "../../../data/ethereumProvider";

export default function ButtonSelectNetwork() {
  const { chainId, switchAppChain } = useContext(EthereumContext);

  const selectOptions = Object.entries(networkMap).map(([chainId, props]) => ({
    value: chainId,
    label: props.shortname,
  }));

  return (
    <div style={{ marginLeft: "10px" }}>
      <Select options={selectOptions} placeholder={networkMap[chainId].shortname} onChange={switchAppChain} />
    </div>
  );
}
