import Layout from "./layout";
import {Outlet} from "react-router-dom";
import React from "react";

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Outlet/>
      </Layout>
    );
  }
}
