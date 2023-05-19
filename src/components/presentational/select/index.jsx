import { useState, useEffect, useRef } from "react";
import * as styles from "./index.module.scss";

import CaretDownOutlined from "jsx:/src/assets/caretDownOutlined.svg";

export default function Select({ options, placeholder, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`${styles.select} ${isOpen ? "open" : ""}`}>
      <div className={styles.selectedOption} onClick={() => setIsOpen((prevState) => !prevState)}>
        <span> {selectedOption?.label ?? placeholder}</span>{" "}
        <CaretDownOutlined className={`${isOpen ? styles.rotate : ""}`} />
      </div>
      {isOpen && (
        <ul className={styles.optionList}>
          {options.map((option) => (
            <li key={option.value} className={styles.option} onClick={() => handleOptionSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
