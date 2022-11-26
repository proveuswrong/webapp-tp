import React, {useContext} from "react";
import {EthereumContext, chains} from "../../data/ethereumProvider";
import CustomButton from "/src/components/ui/button";

export default function ButtonConnect() {
  const ethereumContext = useContext(EthereumContext);

  return (
    <EthereumContext.Consumer>
      {(ethereum) => {
        return (
          <CustomButton
            modifiers="small secondary"
            id="buttonConnect"
            disabled={ethereum?.awaitingUserPermission || !ethereum?.isDeployedOnThisChain}
            onClick={() => {
              ethereum?.accounts.length < 1
                ? ethereumContext.requestAccounts()
                : console.log("There is a connected account already.");
            }}
          >
            <a
              href={
                ethereum?.accounts[0] && ethereumContext.isDeployedOnThisChain
                  ? chains[ethereumContext?.chainId].explorerURL(ethereum?.accounts[0])
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
              key={ethereum?.accounts[0]}
              className="blink"
            >
              {!ethereum?.accounts[0] && ethereum?.awaitingUserPermission
                && "Awaiting User Permission"}
              {!ethereum?.awaitingUserPermission && !ethereum?.accounts[0]
                ? "Connect Account"
                : `${ethereum?.accounts[0]?.substring(0, 6)}...${ethereum?.accounts[0]?.slice(-4)}`}
            </a>
          </CustomButton>
        );
      }}
    </EthereumContext.Consumer>
  );
}
