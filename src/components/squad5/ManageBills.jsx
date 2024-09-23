import React from "react";
import "./ManageBills.css";
import Header from "./Header";
import { motion } from "framer-motion";
import InfoCard from "./InfoCard";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import Feature from "./Feature";
import { Link } from "react-router-dom";

function ManageBills() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="manage-bills"
    >
      {/* <Header /> */}
      <div className="info-card-container">
        <InfoCard icon={faListCheck} text="Manage Bills" />
      </div>
      <div className="features-container">
        <Feature text="Add New Bill" to="/manageBills/addBills" />
        <Feature
          text="Upcoming/Overdue Bills"
          to="/manageBills/overdueUpcoming"
        />
        <Feature text="Reminder Settings" to="/manageBills/reminderSettings" />
        <Feature text="Bills Overview" to="/manageBills/billsOverview" />
        <Feature
          text="Snooze or Mark Paid Bills"
          to="/manageBills/snoozeOrMarkBillsPaid"
        />
        <Feature text="Remove Bills" to='/manageBills/removeBills' />
      </div>
    </motion.div>
  );
}

export default ManageBills;
