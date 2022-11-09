import React from "react";
import {Tooltip as TooltipFromAntDesign} from "antd";

export default function Tooltip(props) {
  return <TooltipFromAntDesign {...props} >{props.children}</TooltipFromAntDesign>;
}
