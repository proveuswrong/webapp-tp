import {Outlet} from "react-router-dom";
import {EthereumContext} from "../../../data/ethereumProvider";
import {useContext} from "react";

export default function EthereumProviderErrors({providedChainId}) {
  const ethereumContext = useContext(EthereumContext);
  console.log(ethereumContext)
  return (
    <section>
      {!ethereumContext?.isDeployedOnThisChain &&
        (<>
            <h2>
              {`Network ${providedChainId} is not supported.`}
            </h2>
            <p>
              Please use the dropdown in navigation menu to switch to a supported network.
            </p>
          </>
        )}
      <Outlet/>
    </section>
  );
}
