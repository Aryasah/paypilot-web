/**
 * Author: Shalini
 * Date: 5th September 2024
 *
 * Description: It validates user signup.
 */

export default function validateSignUpData(formData){
    if (!validateEmail(formData.email)) {
      return "Invalid email format. Please enter a valid .com email.";
    }
  
    if (!validateUserId(formData.userId)) {
      return "User ID cannot be empty.";
    }
  
    if (!validatePassword(formData.password)) {
      return "Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character.";
    }
  
    if (!validatePAN(formData.pan)) {
      return "PAN must be 10 characters long.";
    }
  
    if (!validateIFSCCode(formData.ifscCode)) {
      return "Invalid IFSC code format.";
    }
  
    if (!validateBankSelection(formData.bankName)) {
      return "Please select a bank.";
    }
    
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  }

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
  return emailRegex.test(email);
};

// Password validation (at least 8 characters, contains at least one letter, one number, one special character)
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&#])[A-Za-z\d@$!%?&#]{8,}$/;
  return passwordRegex.test(password);
};

// PAN validation (10 characters)
export const validatePAN = (pan) => {
  return pan.length === 10;
};

// User ID validation (non-empty)
export const validateUserId = (userId) => {
  return userId.trim() !== '';
};

// IFSC code validation (5 letters followed by 7 digits)
export const validateIFSCCode = (ifscCode) => {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifscCode);
};

// Bank selection validation (must not be empty)
export const validateBankSelection = (bankName) => {
  return bankName !== '';
};
//validation code ends
