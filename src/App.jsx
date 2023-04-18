import Layout from "./layout";
import {Outlet} from "react-router-dom";
import React from "react";

console.log(process.env.COMMIT_REF)
export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Outlet/>
      </Layout>
    );
  }
}
