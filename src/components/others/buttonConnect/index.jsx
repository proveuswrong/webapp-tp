import { useContext } from "react";

import { EthereumContext, networkMap } from "../../../data/ethereumProvider";
import CustomButton from "/src/components/presentational/button";

export default function ButtonConnect() {
  const ethereumContext = useContext(EthereumContext);

  return (
    <CustomButton
      modifiers="small secondary"
      id="buttonConnect"
      disabled={ethereumContext?.awaitingUserPermission || !ethereumContext?.isDeployedOnThisChain}
      onClick={() => {
        if (ethereumContext?.accounts.length < 1) {
          ethereumContext.requestAccounts();
        } else {
          console.log("There is a connected account already.");
        }
      }}
    >
      <a
        href={
          ethereumContext?.accounts[0] && ethereumContext.isDeployedOnThisChain
            ? networkMap[ethereumContext?.chainId].explorerURL(ethereumContext?.accounts[0])
            : undefined
        }
        target="_blank"
        rel="noopener noreferrer"
        key={ethereumContext?.accounts[0]}
        className="blink"
      >
        {!ethereumContext?.accounts[0] && ethereumContext?.awaitingUserPermission && "Awaiting User Permission"}
        {!ethereumContext?.accounts[0] && !ethereumContext?.awaitingUserPermission && "Connect Account"}
        {ethereumContext?.accounts[0] &&
          `${ethereumContext?.accounts[0]?.substring(0, 6)}...${ethereumContext?.accounts[0]?.slice(-4)}`}
      </a>
    </CustomButton>
  );
}
