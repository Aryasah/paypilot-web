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
import ManageBills from "./components/squad5/ManageBills";
import RemoveBills from "./components/squad5/RemoveBills";
import AddBills from "./components/squad5/AddBills";
import BillsOverview from "./components/squad5/BillsOverview";
import OverdueUpcoming from "./components/squad5/OverdueUpcoming";
import OverdueBill from "./components/squad5/OverdueBill";
import UpcomingBill from "./components/squad5/UpcomingBill";
import PaymentPage from "./components/squad5/PaymentPage";
import SnoozeOrMarkBillsPaid from "./components/squad5/SnoozeOrMarkBillsPaid";
import BillDetailsPage from "./components/squad5/BillDetailsPage";
import ReminderSettings from "./components/squad5/ReminderSettings";
import Success from "./components/squad5/Success";
import Failure from "./components/squad5/Failure";

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
  // Squad 5 routes
  {
    path: "/manageBills",
    name: "Manage Bills",
    element: ManageBills,
  },
  {
    path: "/manageBills/removeBills",
    name: "Remove Bills",
    element: RemoveBills,
  },
  {
    path: "/manageBills/addBills",
    name: "Add Bills",
    element: AddBills,
  },
  {
    path: "/manageBills/billsOverview",
    name: "Bills Overview",
    element: BillsOverview,
  },
  {
    path: "/manageBills/overdueUpcoming",
    name: "Overdue Upcoming",
    element: OverdueUpcoming,
  },
  {
    path: "/manageBills/overdue",
    name: "Overdue Bill",
    element: OverdueBill,
  },
  {
    path: "/manageBills/upcoming",
    name: "Upcoming Bill",
    element: UpcomingBill,
  },
  {
    path: "/manageBills/payment",
    name: "Payment Page",
    element: PaymentPage,
  },
  {
    path: "/manageBills/snoozeOrMarkBillsPaid",
    name: "Snooze or Mark Bills Paid",
    element: SnoozeOrMarkBillsPaid,
  },
  {
    path: "/manageBills/billsOverview/:category",
    name: "Bill Details Page",
    element: BillDetailsPage,
  },
  {
    path: "/manageBills/reminderSettings",
    name: "Reminder Settings",
    element: ReminderSettings,
  },
  {
    path: "/bill/success",
    name: "Success",
    element: Success,
  },
  {
    path: "/bill/failure",
    name: "Failure",
    element: Failure,
  },
];

export default routes;
