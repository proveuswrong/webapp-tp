import Layout from "./layout";
import { Outlet } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Outlet />
        <ToastContainer position="bottom-right" newestOnTop />
      </Layout>
    );
  }
}
