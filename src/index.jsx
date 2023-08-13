import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import { isHex } from "viem";

import Layout from "./layout";
import Home from "./routes/home";
import FAQ from "./routes/faq";
import Create from "./routes/create";
import Browse, { loader as BrowseLoader } from "./routes/browse";
import Article, { loader as ArticleLoader } from "./routes/article";
import Account, { loader as AccountLoader } from "./routes/account";
import Court, { loader as CourtLoader } from "./routes/court";

import RouteRedirect from "./components/RouteRedirect";
import AuthRequired from "./components/AuthRequired";
import { EthereumProvider, useEthereum } from "./data/ethereumContext";
import { getDefaultNetwork } from "./connectors/networks";
import { Connection } from "./connectors/connection";
import { CoinbaseConnector } from "./connectors/coinbase";
import { MetaMaskConnector } from "./connectors/metamask";
import WalletConnectConnector from "./connectors/walletConnect";

function IndexRedirect() {
  const { state } = useEthereum();
  return <Navigate to={state.appChainId} />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route element={<Layout />}>
        <Route element={<RouteRedirect />}>
          <Route path=":chain" element={<Browse />} loader={BrowseLoader} />
          <Route path=":chain/:contract/:id" element={<Article />} loader={ArticleLoader} />
          <Route path=":chain/:contract/court/:id" element={<Court />} loader={CourtLoader} />

          <Route element={<AuthRequired />}>
            <Route path=":chain/account/:id" element={<Account />} loader={AccountLoader} />
            <Route path=":chain/report" element={<Create />} />
          </Route>
        </Route>
        <Route path="faq" element={<FAQ />} />
        <Route
          path="*"
          element={
            <section>
              <h1>There's nothing here!</h1>
            </section>
          }
        />
      </Route>
    </Route>
  )
);

const configConnection = (config) => {
  const connection = Connection.getInstance(config);
  return { connection, ...config };
};

function App() {
  const chainIdFromUrl = window.location.pathname.split("/")[1];
  const config = configConnection({
    connectors: [
      new MetaMaskConnector(),
      new CoinbaseConnector(),
      new WalletConnectConnector({
        projectId: process.env.WALLET_CONNECT_PROJECT_ID,
        showQrModal: true,
        chains: [1, 5],
      }),
    ],
    appChainId: isHex(chainIdFromUrl) ? chainIdFromUrl : getDefaultNetwork(),
  });
  console.log({ config });
  return (
    <EthereumProvider config={config}>
      <RouterProvider router={router} />
    </EthereumProvider>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
