import React, { useState } from "react";
import * as styles from "./index.module.scss";
import { Button as ButtonFromAntDesign } from "antd";

export default function Button(props) {

  const childrenWithProps = React.Children.map(props.children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {  });
    }
    return child
  });


  return (
    <ButtonFromAntDesign className={`${styles.button} ${props.modifiers}`} {...props}>
      {childrenWithProps}
    </ButtonFromAntDesign>
  );
}
