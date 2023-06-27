import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { EthereumContext, networkMap } from "../../../data/ethereumProvider";
import CustomButton from "/src/components/presentational/button";

const CONNECTION_REQUEST_MSG = (
  <>
    <div>Please install Metamask to connect to app</div>
    <a href="https://metamask.io/download/" target="_blank">
      Install
    </a>
  </>
);

export default function ButtonConnect() {
  const ethereumContext = useContext(EthereumContext);

  /*  useEffect(() => {
    if (!ethereumContext.isProviderDetected)
      toast.warn(CONNECTION_REQUEST_MSG, {
        autoClose: false,
      });
  }, []); */

  return (
    <CustomButton
      modifiers="small secondary"
      id="buttonConnect"
      disabled={ethereumContext?.awaitingUserPermission || !ethereumContext?.isDeployedOnThisChain}
      onClick={() => {
        if (ethereumContext?.accounts.length < 1) {
          ethereumContext.requestAccounts();
          /* ethereumContext.requestAccounts().then(() => {
            ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: ethereumContext.chainId }],
            });
          }); */
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
