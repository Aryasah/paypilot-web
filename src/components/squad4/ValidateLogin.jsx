/**
 * Author: Simran Singh
 * Date: 6th September 2024
 * 
 * Description: This file is to validate the input user ID, email ID and password.
 */

import { useState } from 'react';

const LoginValidation = () => {
  const [input, setInput] = useState(''); // For userId or emailId
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ input: '', password: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { input: '', password: '' };

    // Email or UserId validation
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/; // Email format regex
    if (!input) {
      newErrors.input = 'User ID or Email is required';
      valid = false;
    } else if (!emailRegex.test(input) && input.length < 3) {
      newErrors.input = 'Enter a valid email or user ID';
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      valid = false;
    } else if (!/\d/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return {
    input,
    setInput,
    password,
    setPassword,
    errors,
    validate,
  };
};

export default LoginValidation;
