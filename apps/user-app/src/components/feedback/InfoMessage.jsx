import React from 'react';
import './Messages.css';

const InfoMessage = ({ message }) => {
  return (
    <div className="message message-info">
      <span className="message-icon">ℹ️</span>
      <span className="message-text">{message}</span>
    </div>
  );
};

export default InfoMessage;