import React from 'react';
import './Messages.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="message message-error">
      <span className="message-icon">⚠️</span>
      <span className="message-text">{message}</span>
    </div>
  );
};

export default ErrorMessage;