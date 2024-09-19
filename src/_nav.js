import {
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
    to: "/bill",
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Add Bill",
        to: "/bill",
      },
      {
        component: CNavItem,
        name: "Bill Overview",
        to: "/bill/overview",
      },
      {
        component: CNavItem,
        name: "Upcoming/Overdue Bills",
        to: "/bill/upcoming",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Snooze Bill",
    to: "/bill/snooze",
    icon: <CIcon icon={cilAlarm} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Reminder Settings",
    to: "/bill/reminder",
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
  },

  {
    component: CNavItem,
    name: "Notifications",
    to: "/notifications",
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
];

export default _nav;
