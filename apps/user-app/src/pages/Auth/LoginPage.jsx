// src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import ErrorMessage from '../../components/feedback/ErrorMessage';
import InfoMessage from '../../components/feedback/InfoMessage';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login'); // 'login' or 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  // Login form state
  const [formData, setFormData] = useState({
    identifier: '', // email, mobile, or voter ID
    password: '',
  });

  // OTP state
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  React.useEffect(() => {
    if (step === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => {
        setOtpTimer(otpTimer - 1);
        if (otpTimer === 1) setCanResend(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, otpTimer]);

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const clearMessages = () => {
  setError('');
  setInfo('');
};

  // Handle input change
const handleChange = (e) => {
  clearMessages();
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


  // Handle OTP input
const handleOtpChange = (index, value) => {
  if (!/^\d?$/.test(value)) return;

  clearMessages();

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  if (value && index < 5) {
    document.getElementById(`otp-input-${index + 1}`)?.focus();
  }
};


  // Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(''));
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.identifier.trim()) {
      setError('Please enter your email, mobile, or voter ID');
      return false;
    }
    if (!formData.password) {
      setError('Please enter your password');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  // Handle login
  const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);
  clearMessages();

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    // UI-only success
    setInfo('OTP sent successfully');
    setStep('otp');
    setOtpTimer(300);
    setCanResend(false);
  } catch {
    setError('Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};


  // Handle OTP verification
const handleVerifyOtp = async (e) => {
  e.preventDefault();

  const otpCode = otp.join('');
  if (otpCode.length !== 6) {
    setError('Please enter the complete OTP');
    return;
  }

  setLoading(true);
  clearMessages();

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otpCode === '123456') {
      setInfo('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};


  // Handle resend OTP
const handleResendOtp = async () => {
  if (!canResend || loading) return;

  setLoading(true);
  clearMessages();

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    setInfo('New OTP sent');
    setOtp(['', '', '', '', '', '']);
    setOtpTimer(300);
    setCanResend(false);
  } catch {
    setError('Failed to resend OTP');
  } finally {
    setLoading(false);
  }
};


  // Render login form
  const renderLoginForm = () => (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">🗳️</div>
            <h1>SecureVote</h1>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to access your voting dashboard</p>
        </div>

        {/* Error/Info Messages */}
        {error && <ErrorMessage message={error} />}
        {info && <InfoMessage message={info} />}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          <Input
            label="Email, Mobile, or Voter ID"
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Enter your email, mobile, or voter ID"
            icon="👤"
            disabled={loading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            icon="🔒"
            disabled={loading}
          />

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button type="button" className="forgot-password">
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Sign In'}
          </Button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>

        {/* Security Badge */}
        <div className="security-badge">
          <span className="badge-icon">🔒</span>
          <span>Secure connection</span>
        </div>
      </div>
    </div>
  );

  // Render OTP verification
  const renderOtpVerification = () => (
    <div className="login-container">
      <div className="login-card otp-card">
        {/* Back Button */}
          <button
            disabled={loading}
            onClick={() => {
              if (loading) return;
              setStep('login');
              setOtp(['', '', '', '', '', '']);
              clearMessages();
            }}
              className="back-button"
          >
          ← Back to Login
          </button>


        {/* Header */}
        <div className="login-header">
          <div className="otp-icon">📧</div>
          <h2>Verify OTP</h2>
          <p>Enter the 6-digit code sent to your registered email/mobile</p>
          <p className="identifier">{formData.identifier}</p>
        </div>

        {/* Error/Info Messages */}
        {error && <ErrorMessage message={error} />}
        {info && <InfoMessage message={info} />}

        {/* OTP Form */}
        <form onSubmit={handleVerifyOtp} className="otp-form">
          <div className="otp-inputs" onPaste={handleOtpPaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && index > 0) {
                    document.getElementById(`otp-input-${index - 1}`)?.focus();
                  }
                }}
                className="otp-input"
                disabled={loading}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="otp-timer">
            <span className="timer-icon">⏱️</span>
            <span className="timer-text">{formatTime(otpTimer)}</span>
          </div>

          {/* Resend Button */}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend || loading}
            className={`resend-button ${canResend ? 'active' : ''}`}
          >
            {canResend ? 'Resend OTP' : 'Resend available after timer expires'}
          </button>

          {/* Verify Button */}
          <Button
            type="submit"
            fullWidth
            loading={loading}
            disabled={loading || otp.join('').length !== 6}
          >
            {loading ? <Spinner /> : 'Verify & Continue'}
          </Button>
        </form>

        {/* Help */}
        <div className="otp-help">
          <p className="help-text">Didn't receive the code?</p>
          <ul className="help-list">
            <li>Check your spam/junk folder</li>
            <li>Ensure your email/mobile is correct</li>
            <li>Wait for the timer to resend</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="login-page">
      {step === 'login' ? renderLoginForm() : renderOtpVerification()}
    </div>
  );
};

export default LoginPage;