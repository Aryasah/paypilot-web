import React from 'react';
import { CIcon } from '@coreui/icons-react';
import {
  cibCcAmex,
  cibCcMastercard,
  cibCcVisa,
  cibCcPaypal,
  cilCloudDownload, // Add other icons as needed
} from '@coreui/icons';

// Map payment methods to their respective icons
const paymentIcons = {
  CREDIT_CARD: cibCcVisa,      // You can change this to cibCcMastercard or cibCcAmex if needed
  DEBIT_CARD: cibCcMastercard, // You can use different icons for various card types
  BANK_TRANSFER: cilCloudDownload, // Placeholder, replace with the appropriate icon
  PAYPAL: cibCcPaypal,
};

const PaymentIcon = ({ paymentMethod }) => {
  const icon = paymentIcons[paymentMethod] || null; // Fallback to null if the payment method is not recognized
  console.log(icon,paymentMethod);
  return (
    <CIcon size="xl" icon={icon} />
  );
};

export default PaymentIcon;
