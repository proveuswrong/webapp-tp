import React from "react";
import StepItem, { Status } from "./stepItem";
import * as styles from "./index.module.scss";

type StepsProps = {
  items: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  current: number;
  direction?: "vertical" | "horizontal";
  completed?: boolean;
};

const Steps: React.FC<StepsProps> = ({ items, current, direction = "horizontal", completed }) => {
  const itemsWithStatus = items.map((item, index) => ({
    ...item,
    status: completed ? "completed" : getStatus(index, current),
  }));

  return (
    <div className={`${styles.steps} ${styles[direction] ?? ""}`}>
      {itemsWithStatus.map((item, index) => (
        <StepItem key={index} {...{ ...item, direction }} />
      ))}
    </div>
  );
};

export default Steps;

const getStatus = (index: number, current: number): Status => {
  return index < current ? "completed" : index === current ? "active" : "awaiting";
};
