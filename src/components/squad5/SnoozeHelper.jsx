import { useState } from "react";
import "./SnoozeHelper.css";

const SnoozeHelper = ({ onSearch, onCategoryChange }) => {
  const [billName, setBillName] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearchChange = (event) => {
    setBillName(event.target.value);
    onSearch(event.target.value); // Pass search term to parent
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    onCategoryChange(event.target.value); // Pass category to parent
  };

  return (
    <div className="search-component">
      <div className="filter">
        <label htmlFor="bill-category">Bill Category:</label>
        <select
          id="bill-category"
          name="bill-category"
          className="custom-dropdown"
          value={category}
          onChange={handleCategoryChange} // Handle category change
        >
          <option value="Utilities">Utilities</option>
          <option value="Subscription">Subscription</option>
          <option value="Rent">Rent</option>
          <option value="Others">Others</option>
          <option value="All">All</option> {/* Default option */}
        </select>
      </div>
      <div className="filter">
        <label htmlFor="bill-name">Bill Name:</label>
        <input
          type="text"
          id="bill-name"
          name="bill-name"
          className="custom-input"
          value={billName}
          onChange={handleSearchChange} // Handle input changes
        />
      </div>
    </div>
  );
};

export default SnoozeHelper;
