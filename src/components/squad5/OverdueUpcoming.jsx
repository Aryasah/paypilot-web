import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import InfoCard from "./InfoCard";
import { Link } from "react-router-dom";
import {
  faClipboardList,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import Feature from "./Feature";
import "./OverdueUpcoming.css";
const OverdueUpcoming = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="overdue-upcoming"
    >
      {/* <Header /> */}
      <div className="info-card-container">
        <InfoCard
          icon={faClipboardList}
          text="Overdue bills"
          to="/manageBills/overdue"
        />

        <InfoCard
          icon={faClipboardList}
          text="Upcoming bills"
          to="/manageBills/upcoming"
        />
      </div>
      <div className="back-button">
        <Link to="/manageBills" className="btn btn-primary">
          Back
        </Link>
      </div>
    </motion.div>
  );
};

export default OverdueUpcoming;
