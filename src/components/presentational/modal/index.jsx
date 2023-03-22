import React from "react";
import * as styles from "./index.module.scss";
import {Modal as ModalFromAntDesign} from "antd";

export default function Modal(props) {

  const childrenWithProps = React.Children.map(props.children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {});
    }
    return child
  });

  return (
    <ModalFromAntDesign className={`${props.modifiers}`} {...props} width={null}>
      {childrenWithProps}
    </ModalFromAntDesign>
  );
}