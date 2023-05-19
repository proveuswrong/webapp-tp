import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Select from "/src/components/presentational/select";
import { EthereumContext, networkMap } from "../../../data/ethereumProvider";

export default function ButtonSelectNetwork() {
  const navigate = useNavigate();
  const ethereumContext = useContext(EthereumContext);

  const selectOptions = Object.entries(networkMap).map(([chainId, props], index) => ({
    value: chainId,
    label: props.shortname,
  }));

  function handleOnChange(chainId) {
    console.log({ chainId });
    navigate("/" + chainId + "/");
    if (ethereumContext?.isProviderDetected)
      ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
  }
  return (
    <div style={{ marginLeft: "10px" }}>
      <Select options={selectOptions} placeholder={selectOptions[0].label} onChange={handleOnChange} />
    </div>
  );
}
