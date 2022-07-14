import React, { useState } from "react";
import * as styles from "./index.module.scss";
import { Button as ButtonFromAntDesign } from "antd";

export default function Button(props) {
  return (
    <ButtonFromAntDesign className={`${styles.button} ${props.modifiers}`} {...props}>
      {props.children}
    </ButtonFromAntDesign>
  );
}
