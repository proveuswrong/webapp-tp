import { useState } from "react";
import * as styles from "./index.module.scss";

export default function Tabs({ options, defaultValue, onChange, name }) {
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  const handleOnChange = (e) => {
    setSelectedTab(e.target.value);
    onChange(e);
  };
  return (
    <div className={styles.tabs}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`${styles.tabButton} ${selectedTab === option.value ? styles.active : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedTab === option.value}
            onChange={handleOnChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
