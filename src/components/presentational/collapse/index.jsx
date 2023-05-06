import React, { useState } from "react";
import { Collapse as CollapseAntDesign } from "antd";
import * as styles from "./index.module.scss";
import classNames from "classnames";
import CaretUpIcon from "jsx:/src/assets/caret-up.svg";
import CaretDownIcon from "jsx:/src/assets/caret-down.svg";

const { Panel } = CollapseAntDesign;

export default function Collapse({ header, content, collapseProps, panelProps, className }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const collapseClassNames = classNames(styles.collapse, className);

  const ExpandIcon = () => (isExpanded ? <CaretUpIcon /> : <CaretDownIcon />);

  return (
    <CollapseAntDesign
      className={collapseClassNames}
      expandIcon={ExpandIcon}
      onChange={() => setIsExpanded((prevState) => !prevState)}
      {...collapseProps}
    >
      <Panel header={header} {...panelProps}>
        {content}
      </Panel>
    </CollapseAntDesign>
  );
}
