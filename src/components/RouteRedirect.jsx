import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { EthereumContext, networkMap } from "../data/ethereumProvider";

export default function RouteRedirect() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { chainId, accounts } = useContext(EthereumContext);

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    pathSegments[1] = chainId;

    let newPath = pathSegments.join("/");

    if (location.pathname.includes("account")) {
      if (!accounts[0]) {
        newPath = chainId;
      } else {
        pathSegments[3] = accounts[0];
        newPath = pathSegments.join("/");
      }
    }

    if (params.contract && !Object.keys(networkMap[chainId].deployments).includes(params.contract)) {
      newPath = chainId;
    }

    if (newPath !== location.pathname) {
      navigate(newPath, { replace: true });
    }
  }, [chainId, accounts[0], location.pathname, params.contract, navigate]);

  return <Outlet />;
}
