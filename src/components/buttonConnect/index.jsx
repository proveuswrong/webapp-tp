import React, { useContext, useState } from "react";
import { EthereumContext } from "../../data/ethereumProvider";
import CustomButton from "/src/components/ui/button";

export default function ButtonConnect() {
  const ethereumContext = useContext(EthereumContext);

  return (
    <EthereumContext.Consumer>
      {(ethereum) => {
        console.log(ethereum);
        return (
          <CustomButton
            modifiers="small secondary"
            id="buttonConnect"
            disabled={ethereum?.awaitingUserPermission || !ethereum.isDeployedOnThisChain}
            onClick={() => {
              ethereum?.accounts.length < 1
                ? ethereumContext.requestAccounts()
                : console.log("There is a connected account already.");
            }}
          >
            <a
              href={
                ethereum?.accounts[0] && ethereumContext.isDeployedOnThisChain
                  ? `https://rinkeby.etherscan.io/address/${ethereum?.accounts[0]}`
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
              key={ethereum?.accounts[0]}
              className="blink"
            >
              {!ethereum?.accounts[0] && ethereum?.awaitingUserPermission
                ? "Awaiting User Permission"
                : !ethereum?.accounts[0]
                ? "Connect Account"
                : ethereum?.accounts[0]}
            </a>
          </CustomButton>
        );
      }}
    </EthereumContext.Consumer>
  );
}
