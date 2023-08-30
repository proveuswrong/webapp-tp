import React from "react";
import * as styles from "./index.module.scss";

import CheckIcon from "jsx:/src/assets/checkMark.svg";

export type Status = "completed" | "active" | "awaiting";

type StepItemProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  status?: Status;
  direction: "vertical" | "horizontal";
};

export default function StepItem({ title, description, icon, status = "awaiting", direction }: StepItemProps) {
  icon = status === "completed" ? <CheckIcon /> : icon;
  return (
    <div className={`${styles.stepItem} ${styles[direction] ?? ""} ${styles[status] ?? ""} `}>
      <Circle {...{ icon, direction }} />
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
}

function Circle({ icon, direction }: { direction: string; icon?: React.ReactNode }) {
  const isVertical = direction === "vertical";
  return (
    <div className={`${styles.circleWrapper} blink`}>
      <div className={`${styles.circle} ${icon && !isVertical ? styles.withBorder : ""}`}>
        {icon && !isVertical ? icon : <div className={styles.dot} />}
      </div>
    </div>
  );
}
