import React from "react";
import {Menu} from "antd";

export default function MenuItem(props) {
  return <Menu.Item {...props}>{props.children}</Menu.Item>;
}
