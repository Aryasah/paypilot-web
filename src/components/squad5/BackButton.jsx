import React from "react";
import { Link } from "react-router-dom";
import "./BackButton.css";
const BackButton = () => {
  return (
    <div className="back-button">
      <Link to="/manageBills" className="link-wrapper">
        <button type="button" className="btn btn-dark">
          Manage Bills
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
