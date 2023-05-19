import { utils, constants } from "ethers";
import * as styles from "./index.module.scss";

export default function EtherValue({ value, digits = 3, modifiers }) {
  return (
    <div className={`${styles.container} ${modifiers}`}>{`${formatToEther(value, digits)} ${
      constants.EtherSymbol
    }`}</div>
  );
}

export const formatToEther = (value, digits = 3) => parseFloat(utils.formatUnits(value)).toFixed(digits);
