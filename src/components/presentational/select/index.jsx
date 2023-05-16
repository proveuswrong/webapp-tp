import { Select as SelectAntDesign } from "antd";
import * as styles from "./index.module.scss";
import CaretDownOutlined from "jsx:/src/assets/caretDownOutlined.svg";

export default function Select({ options, defaultValue, onSelect }) {
  return (
    <SelectAntDesign
      className={styles.dropdown}
      style={{ width: 200 }}
      options={options}
      defaultValue={defaultValue}
      onSelect={onSelect}
      suffixIcon={<CaretDownOutlined />}
      showSearch={false}
    />
  );
}
