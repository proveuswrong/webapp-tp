import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Home from "./routes/home";
import FAQ from "./routes/faq";
import Create from "./routes/create";
import Browse from "./routes/browse";
import Article from "./routes/article";
import Account from "./routes/account";
import EthereumProviderErrors from "./components/others/ethereumProviderErrors";

import EthereumProvider, {EthereumContext, networkMap} from "./data/ethereumProvider.jsx";

const app = document.getElementById("app");

ReactDOM.render(
  <BrowserRouter>
    <EthereumProvider>
      <EthereumContext.Consumer>
        {(value) => (
          <Routes>
            <Route path="/" element={<App/>}>
              <Route index element={(networkMap?.[value.chainId]?.contractInstances || !value.chainId) ? <Browse/> :
                <EthereumProviderErrors/>}/>
              <Route path="about/" element={<Home/>}/>
              <Route path="faq/" element={<FAQ/>}/>

              <Route path=":chain/" element={<Browse/>}/>
              <Route path=":chain/report/"
                     element={networkMap?.[value.chainId]?.contractInstances ? <Create/> :
                       <EthereumProviderErrors/>}/>
              <Route path=":chain/:contract/:id/" element={<Article/>}/>
              <Route path=":chain/account/:id/" element={<Account/>}/>
              <Route path="*" element={<section><h1>There's nothing here!</h1></section>}/>
            </Route>
          </Routes>
        )}
      </EthereumContext.Consumer>
    </EthereumProvider>
  </BrowserRouter>,
  app
);
