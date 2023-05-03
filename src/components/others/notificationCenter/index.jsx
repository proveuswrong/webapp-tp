import { useState } from "react";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import * as styles from "./index.module.scss";
import "react-toastify/dist/ReactToastify.css";

import Modal from "../../presentational/modal";
import { toast } from "react-toastify";
import { getTimeAgo } from "../../../utils/time";
import Switch from "../../presentational/switch";

export default function NotificationCenter() {
  const { notifications, clear, markAllAsRead, markAsRead, remove, unreadCount } = useNotificationCenter();
  const [showUnreadOnly, toggleFilter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  console.log(notifications);
  function toggleModal() {
    setIsOpen((prevState) => !prevState);
  }

  const types = ["success", "info", "warning", "error"];
  const addNotification = () => {
    toast("Lorem ipsum dolor sit amet", {
      type: types[getSecureRandomNumber(types.length)],
    });
  };

  return (
    <div className={styles.notificationCenter}>
      <div className={styles.bell} onClick={toggleModal}>
        bell <span>{unreadCount}</span>
      </div>
      <Modal
        visible={isOpen}
        className={styles.notificationModal}
        onCancel={() => setIsOpen(false)}
        footer={[
          <div key="back" onClick={markAllAsRead}>
            Mark all as read
          </div>,
          <button key="primary" onClick={clear}>
            Clear all
          </button>,
        ]}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h4>Notifications</h4>
            <Switch onChange={toggleFilter} label="Show only unread" />
          </div>
          <button style={{ marginBottom: "5px" }} onClick={addNotification}>
            Add dummy notification
          </button>
          <hr />
          <div className={styles.content}>
            {(!notifications.length || (unreadCount === 0 && showUnreadOnly)) && (
              <div className={styles.emptyMessage}>You have no new notifications</div>
            )}
            {(showUnreadOnly ? notifications.filter((n) => !n.read) : notifications).map((notification) => (
              <div key={notification.id} className={styles.item}>
                <div>{notification.icon}</div>
                <div>
                  <div className={styles.itemContent}>{notification.content}</div>
                  <div>{getTimeAgo(notification.createdAt)}</div>
                </div>
                <div
                  className={`${styles.mark} ${notification.read && styles.read}`}
                  onClick={() => markAsRead(notification.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

const getSecureRandomNumber = (max) => {
  let cryptoObj = window.crypto;
  let randomBuffer = new Uint32Array(1); // Create a buffer for random data
  cryptoObj.getRandomValues(randomBuffer); // Fill the buffer with random data
  return randomBuffer[0] % max; // Return a random number within the desired range
};
