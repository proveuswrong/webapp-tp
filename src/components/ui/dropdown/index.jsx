import React, {useState} from "react";
import * as styles from "./index.module.scss";
import {Dropdown as DropdownFromAntDesign} from "antd";

export default function Dropdown(props) {

  return <DropdownFromAntDesign className={`${styles.dropdown} ${props.modifiers}`} {...props}>{props.children}</DropdownFromAntDesign>
}
