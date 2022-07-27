import {Outlet} from "react-router-dom";
import {EthereumContext} from "../../data/ethereumProvider";

export default function EthereumProviderErrors() {

  return (
    <section>
      <EthereumContext.Consumer>
        {(context) => (
          <h2>
            {!context.isProviderDetected ? "No Ethereum provider has been detected." : !context.isDeployedOnThisChain && "This chain id is not supported."}
          </h2>
        )}
      </EthereumContext.Consumer>
      <Outlet/>
    </section>
  );
}
