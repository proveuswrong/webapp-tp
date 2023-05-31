import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "./layout";
import Home from "./routes/home";
import FAQ from "./routes/faq";
import Create from "./routes/create";
import Browse from "./routes/browse";
import Article from "./routes/article";
import Account from "./routes/account";
import Court from "./routes/court";
import EthereumProviderErrors from "./components/others/ethereumProviderErrors";

import EthereumProvider from "./data/ethereumProvider.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Browse />} />
      <Route path="about" element={<Home />} />
      <Route path="faq" element={<FAQ />} />

      <Route path=":chain" element={<Browse />} />
      <Route path=":chain/:contract/:id" element={<Article />} />
      <Route path=":chain/report" element={<Create />} />
      <Route path=":chain/:contract/court/:id" element={<Court />} />
      <Route path=":chain/account/:id" element={<Account />} />
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
  return (
    <EthereumProvider>
      <RouterProvider router={router} />
    </EthereumProvider>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
