import {Outlet} from "react-router-dom";
import {EthereumContext} from "../../data/ethereumProvider";
import {useContext} from "react";

export default function EthereumProviderErrors() {
  const ethereumContext = useContext(EthereumContext);
  console.log(ethereumContext)
  return (
    <section>
      <h2>
        {!ethereumContext?.isDeployedOnThisChain && "This chain id is not supported."}
      </h2>
      <Outlet/>
    </section>
  );
}
