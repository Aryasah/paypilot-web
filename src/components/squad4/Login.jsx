/**
 * Author: Shrilakshmi Upadhya
 * Date: 6th September 2024
 * 
 * Description: This is the login page for existing users.
 */

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './Login.styles.css';
import ManImage from '../../assets/images/man.png';
import SadManImage from '../../assets/images/sadman.png';
import LoginValidation from './ValidateLogin';
import ForgotPassword from './ForgotPassword';
import { useDispatch } from 'react-redux';
import { login } from 'src/store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {
        input,
        setInput,
        password,
        setPassword,
        errors,
        validate,
    } = LoginValidation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(300);
    const [isOtpExpired, setIsOtpExpired] = useState(false);
    const [resendingOtp, setResendingOtp] = useState(false);
    const [storedEmail, setStoredEmail] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleShowForgotPassword = () => {
        setShowForgotPassword(true); // Show Forgot Password screen
    };

    const handleBackToLogin = () => {
        setShowForgotPassword(false); // Go back to the login screen
    };

    // Handle login credentials submission
    const handleLogin = async () => {
        if (!validate()) {
            setError('');
            return;
        }

        // Normalize input if it's an email
        const normalizedInput = input.includes('@') ? input.toLowerCase() : input;

        try {
            const response = await fetch('http://papilot.s3-website.ap-south-1.amazonaws.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: normalizedInput, // email or userId
                    password: password // password entered by user
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Login successful");

                // Store the email from the response
                setStoredEmail(result.email.toLowerCase());

                setError('');
                setStep(2); // Proceed to screen verification if login is successful
            } else if (response.status === 401) {
                setError("Incorrect password");
            } else if (response.status === 404) {
                setError("User not found");
            } else {
                setError("Login failed");
            }
        } catch (err) {
            setError('Error logging in');
        }
    };

    // Handle reCAPTCHA change
    const handleCaptchaChange = (value) => {
        console.log("Captcha value:", value);
        if (value) {
            setCaptchaVerified(true); // If CAPTCHA is verified, enable send OTP
            setVerificationError(''); // Clear verification error, if any
        }
    };

    // Handle CAPTCHA expiration
    const handleCaptchaExpire = () => {
        setCaptchaVerified(false); // Disable the Send OTP button if CAPTCHA expires
        setVerificationError('Verification expired. Please check the box again.');
    };

    // Handle OTP countdown
    const startOtpCountdown = () => {
        setCountdown(300); // Set OTP validity period to 5 minutes (300 seconds)
        setIsOtpExpired(false); // Reset OTP expired status
        const intervalId = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(intervalId);
                    setIsOtpExpired(true); // OTP has expired
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000); // Decrement the countdown every second
    };

    // Handle screen verification with reCAPTCHA and sending OTP
    const handleSendOtp = async () => {
        if (captchaVerified) {
            setLoading(true); // Set loading to true while OTP is being sent
            console.log("Captcha verified, sending OTP...");

            // Normalize email before sending
            const normalizedEmail = storedEmail.toLowerCase();

            try {
                const response = await fetch(`http://papilot.s3-website.ap-south-1.amazonaws.com/api/users/send-otp/${normalizedEmail}`, {
                    method: 'POST',
                });

                if (response.ok) {
                    console.log("OTP sent successfully");
                    setOtpSent(true); // OTP sent successfully
                    setStep(3); // Move to OTP verification step
                    setError('');
                    startOtpCountdown(); // Start countdown timer for OTP expiry
                } else {
                    setError('Error sending OTP');
                }
            } catch (err) {
                setError('Error sending OTP');
            } finally {
                setLoading(false); // Stop loading once OTP is sent or fails
            }
        } else {
            setVerificationError('Please complete the CAPTCHA verification.');
        }
    };

    // Resend OTP function
    const handleResendOtp = async () => {
        setResendingOtp(true);
        console.log("Resending OTP...");
        await handleSendOtp(); // Resend OTP and restart countdown
        setIsOtpExpired(false);
        setResendingOtp(false);
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
                    body: JSON.stringify({ email: storedEmail.toLowerCase(), otp }),
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setError('');
                        console.log("OTP Verified, UserId:", result.userId);
                        setStep(4); // Proceed to the dashboard
                        dispatch(login({ userId: result.userId })); // Store the userId in Redux after OTP verification is successful
                        navigate('/'); // Redirect to the dashboard
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

    const renderLoginForm = () => (
        <div className="login-container">
            <h1><strong>Paypilot</strong></h1>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Enter user ID or email ID"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
            />
            {errors.input && <p className="error">{errors.input}</p>}
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <button onClick={handleLogin}>Next</button>
            <p className="forgot-password-link" onClick={handleShowForgotPassword}>
                Forgot Password?
            </p>
            {error && <p className="error">{error}</p>}

            <p className="signup-link">
              New user? <a href="/signup">SignUp</a>
            </p>
        </div>
    );

    const renderCaptchaVerification = () => (
        <div className="screen-verification-container">
            <h2>Screen Verification</h2>
            <p>Please complete the CAPTCHA:</p>
            <ReCAPTCHA
                sitekey="6LcDCTgqAAAAAP7a6Nfd9raz8Uf3-ze8wsQAsW_d"
                onChange={handleCaptchaChange}
                onExpired={handleCaptchaExpire}
            />
            <button
                onClick={handleSendOtp}
                className="send-otp-btn"
                disabled={!captchaVerified || loading} // Disable button until CAPTCHA is verified
            >
                {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            {verificationError && <p className="error">{verificationError}</p>}
        </div>
    );

    const renderOtpForm = () => (
        <div className="otp-container">
            <h2>OTP Verification</h2>
            <p><b>OTP sent to {storedEmail}</b></p>
            {!isOtpExpired && otpSent && (
                <p>
                    <b>Please enter the OTP within {Math.floor(countdown / 60)}m
                        {(countdown % 60).toString().padStart(2, '0')}s.</b>
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
                        required
                    />
                    <button onClick={handleOtpVerification} disabled={isOtpExpired}>
                        Submit
                    </button>
                </>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );

    const renderDashboard = () => (
        <div className="dashboard">
            <h2>Authentication successful !!!</h2>
            <p>Redirecting to dashboard ...</p>
        </div>
    );

    // Render steps based on the current process step
    return (
        <div className="login-wrapper">
            {!showForgotPassword && (
                <div className="image-container">
                    <img src={error ? SadManImage : ManImage} alt="Login Image" />
                </div>
            )}
            {!showForgotPassword ? (
                <>
                    {step === 1 && renderLoginForm()}
                    {step === 2 && renderCaptchaVerification()}
                    {step === 3 && renderOtpForm()}
                    {step === 4 && renderDashboard()}
                </>
            ) : (
                <ForgotPassword onBackToLogin={handleBackToLogin} />
            )}
        </div>
    );
};

export default Login;
