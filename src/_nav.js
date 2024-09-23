import {
  cilAccountLogout,
  cilAlarm,
  cilAvTimer,
  cilBell,
  cilCreditCard,
  cilHistory,
  cilSettings,
  cilSpeedometer
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Bills",
  },
  {
    component: CNavGroup,
    name: "Manage Bills",
    to: "/manageBills",
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Add Bill",
        to: "/manageBills/addBills",
      },
      {
        component: CNavItem,
        name: "Bill Overview",
        to: "/manageBills/billsOverview",
      },
      {
        component: CNavItem,
        name: "Upcoming/Overdue Bills",
        to: "/manageBills/overdueUpcoming",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Snooze Bill",
    to: "/manageBills/snoozeOrMarkBillsPaid",
    icon: <CIcon icon={cilAlarm} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Reminder Settings",
    to: "/manageBills/reminderSettings",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Payments",
  },
  {
    component: CNavGroup,
    name: "Schedule Payments",
    to: "/payments",
    icon: <CIcon icon={cilAvTimer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Schedule Bills",
        to: "/schedule-bills",
      },
      {
        component: CNavItem,
        name: "Scheduled Payments",
        to: "/schedule-payments",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Track Payment",
    to: "/payments",
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Overview",
        to: "/payment/overview",
      },
      {
        component: CNavItem,
        name: "History",
        to: "/payment/history",
      },
      {
        component: CNavItem,
        name: "Progress",
        to: "/payment/progress",
      },
    ],
  }
];

export default _nav;
