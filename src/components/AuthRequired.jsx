import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { EthereumContext } from "../data/ethereumContext";
import { isAddress } from "viem";

export default function AuthRequired() {
  const { state } = useContext(EthereumContext);
  if (isAddress(state.account)) {
    return <Navigate to={state.appChainId} replace />;
  }
  return <Outlet />;
}
