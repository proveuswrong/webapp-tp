import { useState } from "react";
import * as styles from "./index.module.scss";

export default function Switch({ onChange, label, positionRight }) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div className={`${styles.switch} ${positionRight && styles.right}`}>
      {label && <div>{label}</div>}
      <input type="checkbox" className="switch-checkbox" checked={checked} onChange={handleChange} id="switch" />
      <label className={styles.switchArea} htmlFor="switch">
        <span className={styles.switchAreaInner} />
        <span className={styles.switchBtn} />
      </label>
    </div>
  );
}
