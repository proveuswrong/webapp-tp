import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEthereum } from "../data/ethereumContext";
import { networkMap } from "../connectors/networks";

export default function RouteRedirect() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const {
    state: { appChainId, account },
  } = useEthereum();

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    pathSegments[1] = appChainId;

    let newPath = pathSegments.join("/");

    if (location.pathname.includes("account")) {
      if (account === "0x0") {
        newPath = appChainId;
      } else {
        pathSegments[3] = account;
        newPath = pathSegments.join("/");
        console.log({ newPath });
      }
    }

    if (params.contract && !Object.keys(networkMap[appChainId].deployments).includes(params.contract)) {
      newPath = appChainId;
    }

    if (newPath !== location.pathname) {
      navigate(newPath, { replace: true });
    }
  }, [appChainId, account, location.pathname, params.contract, navigate]);

  return <Outlet />;
}
