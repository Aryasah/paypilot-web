import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BillSearchComponent.css";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Badge } from "react-bootstrap";

const BillSearchComponent = ({ handleListChange, originalList }) => {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState("all");

  const handleFilters = () => {
    let filteredList = originalList;

    // Filter by category
    if (category !== "all") {
      filteredList = filteredList.filter(
        (item) => item.billCategory.toLowerCase() === category
      );
    }

    // Filter by name
    if (name.trim() !== "") {
      filteredList = filteredList.filter((item) =>
        item.billName.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Filter by date
    if (selectedDate) {
      filteredList = filteredList.filter((item) => {
        const billDueDate = new Date(item.dueDate);
        return (
          billDueDate.getFullYear() === selectedDate.getFullYear() &&
          billDueDate.getMonth() === selectedDate.getMonth() &&
          billDueDate.getDate() === selectedDate.getDate()
        );
      });
    }

    handleListChange(filteredList); // Call to update the filtered list
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
    setSelectedDate(null); // Reset date filter when category changes
  };

  const handleName = (event) => {
    setName(event.target.value);
    setSelectedDate(null); // Reset date filter when name changes
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  // Call handleFilters whenever any of the filters change
  useEffect(() => {
    handleFilters();
  }, [category, name, selectedDate]);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Filter by Date</Popover.Header>
      <Popover.Body>
        <DatePicker
          selected={selectedDate}
          onChange={handleDate}
          dateFormat="yyyy/MM/dd"
          isClearable
          inline
          placeholderText="Select a date"
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="search-component">
      <div className="filter">
        <label htmlFor="bill-category">Bill Category:</label>
        <select
          id="bill-category"
          name="bill-category"
          className="custom-dropdown"
          onChange={handleCategory}
          value={category}
        >
          <option value="all">All</option>
          <option value="utilities">Utilities</option>
          <option value="subscription">Subscription</option>
          <option value="rent">Rent</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="bill-name">Bill Name:</label>
        <input
          type="text"
          id="bill-name"
          name="bill-name"
          className="custom-input"
          value={name}
          onChange={handleName}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <OverlayTrigger
          trigger="click"
          placement="bottom-end"
          overlay={popover}
        >
          <FontAwesomeIcon
            icon={faFilter}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginTop: "1rem",
            }}
            size="xl"
          />
        </OverlayTrigger>
        {selectedDate && (
          <Badge
            bg="danger"
            pill
            onClick={() => {
              setSelectedDate(null);
            }}
          >
            X
          </Badge>
        )}
      </div>
    </div>
  );
};
export default BillSearchComponent;
