import { useContext } from "react";
import { EthereumContext } from "../data/ethereumProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired() {
  const { accounts, chainId } = useContext(EthereumContext);
  if (accounts[0] === undefined) {
    return <Navigate to={chainId} replace />;
  }
  return <Outlet />;
}
