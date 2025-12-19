import React from 'react';
import './Button.css';

const Button = ({
  children,
  type = 'button',
  onClick,
  fullWidth = false,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
