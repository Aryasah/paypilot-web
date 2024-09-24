/**
 * Author: Shrilakshmi Upadhya
 * Date: 10th September 2024
 * 
 * Description: This is the code for ForgotPassword flow for the Login.
 */

import React, { useState } from 'react';
import './ForgotPassword.styles.css';
import ManImage from '../../assets/images/man.png';
import SadManImage from '../../assets/images/sadman.png';


const ForgotPassword = ({ onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({ password: '', confirmPassword: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOtpExpired, setIsOtpExpired] = useState(false);
    const [countdown, setCountdown] = useState(300);
    const [resendingOtp, setResendingOtp] = useState(false);

    // Password validation function
    const validatePassword = () => {
        let isValid = true;
        const errors = { password: '', confirmPassword: '' };

        if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            errors.password = 'Password must contain at least one uppercase letter';
            isValid = false;
        } else if (!/\d/.test(password)) {
            errors.password = 'Password must contain at least one number';
            isValid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.password = 'Password must contain at least one special character';
            isValid = false;
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    // Handle submission of email and user ID for verification
    const handleSubmitUserDetails = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('http://papilot.s3-website.ap-south-1.amazonaws.com/api/users/verify-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, email }),
            });

            if (response.ok) {
                const sendOtpResponse = await fetch(`http://papilot.s3-website.ap-south-1.amazonaws.com/api/users/send-otp/${email}`, {
                    method: 'POST',
                });

                if (sendOtpResponse.ok) {
                    setOtpSent(true);
                    setStep(2);
                    setError('');
                    startOtpCountdown(); // Start countdown for OTP expiration
                } else {
                    setError('Error sending OTP');
                }
            } else {
                setError('User ID or email not found');
            }
        } catch (err) {
            setError('Error processing request');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle OTP verification
    const handleOtpVerification = async () => {
        if (isOtpExpired) {
            setError('OTP has expired. Please request a new OTP.');
        } else {
            try {
                const response = await fetch('http://papilot.s3-website.ap-south-1.amazonaws.com/api/users/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, otp }),
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.success === 'true') {
                        setError('');
                        setStep(3);
                    } else {
                        setError('Invalid OTP');
                    }
                } else {
                    setError('Error verifying OTP');
                }
            } catch (err) {
                setError('Error verifying OTP');
            }
        }
    };

    // Handle password reset
    const handlePasswordReset = async () => {
        if (!validatePassword()) {
            return;
        }

        try {
            const response = await fetch('http://papilot.s3-website.ap-south-1.amazonaws.com/api/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword: password }),
            });

            if (response.ok) {
                alert('Password reset successful!');
                onBackToLogin();
            } else {
                setError('Error resetting password');
            }
        } catch (err) {
            setError('Error resetting password');
        }
    };

    // Start OTP countdown
    const startOtpCountdown = () => {
        setCountdown(300); // Set OTP validity period to 5 minutes
        setIsOtpExpired(false);
        const intervalId = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(intervalId);
                    setIsOtpExpired(true);
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000); // Decrement countdown every second
    };

    // Handle OTP resend
    const handleResendOtp = async () => {
        setResendingOtp(true);
        try {
            await handleSubmitUserDetails(); // Resend OTP
            setIsOtpExpired(false); // Reset OTP expiration status
        } finally {
            setResendingOtp(false);
        }
    };

    // Format countdown to display
    const formatCountdown = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}m${secs.toString().padStart(2, '0')}s`;
    };

    return (
        <div className="forgot-password-wrapper">
            {/* Form Container */}
            <div className="forgot-password-container">
                {step === 1 && (
                    <div className="forgot-password-form">
                        <h2>Forgot Password</h2>
                        <input
                            type="text"
                            placeholder="Enter registered User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Enter registered Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        />
                        <button
                            onClick={handleSubmitUserDetails}
                            disabled={isSubmitting}
                            className={isSubmitting ? 'send-otp-btn disabled' : 'send-otp-btn'}
                        >
                            {isSubmitting ? 'Sending OTP...' : 'Submit'}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2>OTP Verification</h2>
                        <p><b>OTP sent to {email}</b></p>
                        {!isOtpExpired && otpSent && (
                            <p>
                                <b>Please enter the OTP within {formatCountdown(countdown)}.</b>
                            </p>
                        )}
                        {isOtpExpired ? (
                            <button
                                onClick={handleResendOtp}
                                disabled={resendingOtp}
                                className={`resend-otp-btn ${resendingOtp ? 'disabled' : ''}`}
                            >
                                {resendingOtp ? 'Resending OTP...' : 'Resend OTP'}
                            </button>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button onClick={handleOtpVerification}>Verify OTP</button>
                            </>
                        )}
                        {error && <p className="error">{error}</p>}
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2>Set New Password</h2>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {validationErrors.password && <p className="error">{validationErrors.password}</p>}
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {validationErrors.confirmPassword && <p className="error">{validationErrors.confirmPassword}</p>}
                        <button onClick={handlePasswordReset}>Reset Password</button>
                        {error && <p className="error">{error}</p>}
                    </div>
                )}
            </div>

            {/* Image Container */}
            <div className="man-image">
                <img src={error ? SadManImage : ManImage} alt="Man" />
            </div>
        </div>

    );
};

export default ForgotPassword;
