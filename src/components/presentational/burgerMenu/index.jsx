import * as styles from "./index.module.scss";

export default function BurgerMenu({ isOpen, onClick }) {
  return (
    <div className={`${styles.burgerMenu} ${isOpen && styles.open}`} onClick={onClick}>
      <span />
      <span />
      <span />
    </div>
  );
}
