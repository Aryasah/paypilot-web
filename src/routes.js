import React from "react";
import Dashboard from "./views/dashboard/Dashboard";
import PaymentHistory from "./views/pages/PaymentHistory";
import { Navigate } from "react-router-dom";
import PaymentOverview from "./views/pages/PaymentOverview";
import PaymentProgress from "./views/pages/PaymentProgress";
import SchedulePayment from "./views/pages/SchedulePayment";
import SchedulePaymentList from "./views/pages/SchedulePaymentList";
import ScheduleBill from "./views/pages/ScheduleBill";
import ModifySchedulePayment from "./views/pages/ModifySchedulePayments";

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  {
    path: "/payment/history",
    name: "Payment History",
    element: PaymentHistory,
  },
  {
    path: "/payment/overview",
    name: "Payment Overview",
    element: PaymentOverview,
  },
  {
    path: "/payment/progress",
    name: "Payment Progress",
    element: PaymentProgress,
  },
  {
    path: "/schedule-payments",
    name: "Schedule Payment",
    element: SchedulePaymentList,
  },
  {
    path: "/schedule-payment/create",
    name: "Schedule Payment",
    element: SchedulePayment,
  },
  {
    path: "/schedule-bills",
    name: "Schedule Bills",
    element: ScheduleBill,
  },
  {
    path: "/schedule-payment/modify",
    name: "Modify Schedule Payment",
    element: ModifySchedulePayment,
  },
];

export default routes;
