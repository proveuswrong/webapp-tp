import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";

import Layout from "./layout";
import Home from "./routes/home";
import FAQ from "./routes/faq";
import Create from "./routes/create";
import Browse, { loader as BrowseLoader } from "./routes/browse";
import Article, { loader as ArticleLoader } from "./routes/article";
import Account, { loader as AccountLoader } from "./routes/account";
import Court, { loader as CourtLoader } from "./routes/court";
import EthereumProviderErrors from "./components/others/ethereumProviderErrors";

import EthereumProvider, { EthereumContext } from "./data/ethereumProvider.jsx";
import RouteRedirect from "./components/RouteRedirect";
import AuthRequired from "./components/AuthRequired";

function IndexRedirect() {
  const { chainId } = useContext(EthereumContext);
  return <Navigate to={chainId} />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route element={<RouteRedirect />}>
        <Route index element={<IndexRedirect />} />

        <Route path=":chain" element={<Browse />} loader={BrowseLoader} />
        <Route path=":chain/:contract/:id" element={<Article />} loader={ArticleLoader} />
        <Route path=":chain/:contract/court/:id" element={<Court />} loader={CourtLoader} />

        <Route element={<AuthRequired />}>
          <Route path=":chain/account/:id" element={<Account />} loader={AccountLoader} />
          <Route path=":chain/report" element={<Create />} />
        </Route>
      </Route>
      <Route path="about" element={<Home />} />
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
  )
);

function App() {
  const { pathname } = window.location;
  const pathSegment = pathname.split("/")[1];
  const chainId = pathSegment.startsWith("0x") ? pathSegment : undefined;
  return (
    <EthereumProvider chainId={chainId}>
      <RouterProvider router={router} />
    </EthereumProvider>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
