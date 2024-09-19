import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { SchedulePaymentService } from "src/services/api-services";

const data = [
  {
    paymentId: 1,
    paymentDate: "2024-09-17",
    paymentMode: "CREDIT_CARD",
    payerAccountNumber: "123456",
    amountPaid: 205.0,
    status: "COMPLETED",
    category: "GROCERIES",
    bill: {
      billId: 1,
      billName: "Google Pay Bill",
      billCategory: "Groceries",
      dueDate: "2024-01-30",
      amount: 11000.5,
      reminderFrequency: "Monthly",
      attachment: "electricity_bill_september.pdf",
      notes: "Pay by end of the month",
      isRecurring: "Y",
      paymentStatus: "Paid",
      userId: "amansah",
    },
  },
];
const ModifySchedulePayment = () => {
  const location = useLocation();
  const { payment } = location.state;
  const navigate = useNavigate();
  const [scheduledDate, setScheduledDate] = useState(payment.scheduledDate);

  const [payments, setPayments] = useState([]);
  const [category, setCategory] = useState([]);
  const [userId, setUserId] = useState("amansah");
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const [billId, setBillId] = useState(payment?.bill?.billId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPaymentDetails = {
      ...payment,
      scheduledDate, // Update the payment date
      updateDate: new Date().toISOString(),
    };

    try {
      const response = await SchedulePaymentService.updateScheduledPayment(
        updatedPaymentDetails,
        scheduledDate
      );
      console.log("Payment modified successfully:", response);
      alert("Payment modified successfully");
      navigate("/schedule-payments");
    } catch (error) {
      console.error("Error modifying payment:", error);
    }
  };

  return (
    <CCol xs>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            {/* First div with category select */}
            <div className="d-flex align-items-center" style={{ width: "20%" }}>
              <label htmlFor="category" className="form-label mt-2 me-2">
                Bill Id
              </label>
              <CFormSelect
                id="category"
                aria-label="Select Category"
                value={billId}
                style={{ flex: 1 }}
              >
                <option value={billId}>{billId}</option>
              </CFormSelect>
            </div>
            {/* Second div with two selects for date pickers */}
            <div className="row">
              <div className="col-sm-6 d-flex justify-content-between align-items-center">
                <label
                  style={{ width: "120px" }}
                  htmlFor="startDate"
                  className="form-label mt-2 me-1"
                >
                  From Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control"
                  value={fromDate}
                />
              </div>
              <div className="col-sm-6 d-flex justify-content-between align-items-center">
                <label
                  style={{ width: "120px" }}
                  htmlFor="endDate"
                  className="form-label mt-2 me-1"
                >
                  To Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="form-control"
                  value={toDate}
                />
              </div>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit} className="row g-3">
            <CCol md={6}>
              <CFormSelect
                id="inputPayee"
                label="Select Payee"
                value={payment.payee.payeeId ?? ""}
              >
                <option value={payment.payee.payeeId}>
                  {payment.payee.payeeName}
                </option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="inputPayeeName"
                label="Payee Name"
                value={payment.payee.payeeName}
                readOnly
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="inputPayeeBankDetails"
                label="Payee Bank Details"
                value={payment.payee.payeeBankDetails}
                placeholder="Account: 123456789, Bank: XYZ Bank"
                readOnly
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="inputPayeeAddress"
                label="Payee Address"
                value={payment.payee.payeeAddress}
                placeholder="1234 Main St"
                readOnly
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                value={payment.paymentFrequency}
                readOnly
                id="inputFrequency"
                label="Payment Frequency"
              >
                <option>Choose...</option>
                {[
                  "ONE_TIME",
                  "DAILY",
                  "WEEKLY",
                  "MONTHLY",
                  "QUARTERLY",
                  "HALF_YEARLY",
                  "ANNUAL",
                ].map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency.replace("_", " ")}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormSelect
                id="inputMethod"
                label="Payment Method"
                value={payment.paymentMode}
                readOnly
              >
                <option value="">Choose...</option>
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="DEBIT_CARD">Debit Card</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="PAYPAL">PayPal</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                id="inputPayeeAccountNumber"
                label="Payee Account Number"
                placeholder="123456XXXX"
                value={payment.payerAccountNumber}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="date"
                id="inputScheduleDate"
                label="Bill Date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="number"
                id="inputAmount"
                label="Amount (in Rs.)"
                placeholder="100000"
                required
                value={payment.amount}
                readOnly
              />
            </CCol>

            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Schedule Payment
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default ModifySchedulePayment;
