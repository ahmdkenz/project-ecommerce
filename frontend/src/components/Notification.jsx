import React, { useEffect } from "react";
import "../Notification.css";

const Notification = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;