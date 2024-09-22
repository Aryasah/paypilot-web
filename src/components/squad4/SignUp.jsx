/**
 * Author: Rahul Prasad
 * Date: 5th September 2024
 *
 * Description: This is user signup page.
 */

import React, { useState } from "react";
import "./SignUp.styles.css";
import ManImage from "../../assets/images/man.png";
import SadManImage from "../../assets/images/sadman.png";
import validateSignUpData from "./ValidateSignup";
const SignUp = () => {
  const [formErrors, setFormErrors] = useState("");
  let [messageFromServer, setMessageFromServer] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    userId: "",
    password: "",
    confirmPassword: "",
    pan: "",
    bankAccount: "",
    ifscCode: "",
    bankName: "",
  });

  //handles changes in form input
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  //handles changes in form input-Shrilakshmi
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Normalize email to lowercase
    const normalizedValue = (name === 'email') ? value.toLowerCase() : value;

    setFormData((prevData) => ({
        ...prevData,
        [name]: normalizedValue,
    }));
};

  //it handles form submission and API calls
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationMessage = validateSignUpData(formData);
    if(validationMessage===""){
      setFormErrors("");
    }else{
      setFormErrors(validationMessage);
      setMessageFromServer("");
      return;
    }
    console.log("Form Data:", formData);
    let objectToSave = {
      userId: formData.userId,
      password: formData.password,
      email: formData.email,
      bankAccount: formData.bankAccount,
      bankName: formData.bankName,
      pan: formData.pan,
      ifscCode: formData.ifscCode,
    };  
    try {
      const response = await fetch("http://localhost:8082/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectToSave),
      });
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setMessageFromServer("User Access Successfully Raised!!");
      } else {
        //if server returns conflict i.e user already exits http 409
        if (response.status === 409) {
          setMessageFromServer("Account already exists!!");
        }
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const messageStyle = {
    color:
      messageFromServer === "User Access Successfully Raised!!" ? "green" : "red",
  };

  const getManImage = () => {
    if(formErrors!==""){
      return <img src={SadManImage} alt="sad-man"></img>;
    }
    if (
      messageFromServer === "" ||
      messageFromServer === "User Access Successfully Raised!!"
    ) {
      return <img src={ManImage} alt="man"></img>;
    }
    return <img src={SadManImage} alt="sad-man"></img>;
  };

  return (
    <>
      <div className="registration-container">
        <div className="image-container">{getManImage()}</div>
        <div className="form-container">
          <h2>PayPilot</h2>
          <h3>
            Register Now!! <span className="signup_span" style={messageStyle}>{messageFromServer}</span>
            <div className="formErrors">{formErrors}</div>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Enter your mail id"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="pan"
                placeholder="Enter the Pan details"
                value={formData.pan}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="userId"
                placeholder="Enter your user id"
                value={formData.userId}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="bankAccount"
                placeholder="Enter the Bank account number"
                value={formData.bankAccount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="password"
                name="password"
                placeholder="Enter the password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="ifscCode"
                placeholder="Enter the Bank IFSC code"
                value={formData.ifscCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                required
              >
                <option value="">Select bank</option>
                <option value="HDFC">HDFC</option>
                <option value="SBI">SBI</option>
                <option value="YES BANK">YES BANK</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">
              Request Access
            </button>
          </form>
          <p className="login-link">
            Already a user | <a href="/login">Login</a>
          </p>
        </div>

      </div>
    </>
  );
};

export default SignUp;
