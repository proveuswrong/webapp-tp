import Layout from "./layout";
import {Outlet} from "react-router-dom";
import React from "react";

import { config } from "dotenv";

const isProd = (branchName) =>
  branchName === 'main' || branchName.startsWith('hotfix/') || branchName.startsWith('release/') || (branchName === 'develop' && process.env.PULL_REQUEST);

config({
  path: `${isProd(process.env.HEAD) ? ".env.production" : ".env.development"}`,
});

console.debug(`Environment: ${process.env.ENV}`);
console.debug(`Head: ${process.env.HEAD}`);
console.debug(`Commit Ref: ${process.env.COMMIT_REF}`);
console.debug(`Pull Request: ${process.env.PULL_REQUEST}`);
console.debug(`Review ID: ${process.env.REVIEW_ID}`);


export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Outlet/>
      </Layout>
    );
  }
}
