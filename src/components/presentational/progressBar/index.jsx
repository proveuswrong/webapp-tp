import { Progress } from "antd";
import * as styles from "./index.module.scss";

import { getBreakpointValue } from "../../../utils/breakpoints";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export default function ProgressBar(props) {
  const breakpoint = getBreakpointValue("large");
  const isCircular = useMediaQuery(`(max-width: ${breakpoint}px)`);

  const type = isCircular ? "circle" : "line";
  const strokeLinecap = isCircular ? "square" : "round";
  const typeStyles = isCircular ? styles.progressBarCircular : styles.progressBar;

  return <Progress className={typeStyles} type={type} strokeLinecap={strokeLinecap} {...props} />;
}
