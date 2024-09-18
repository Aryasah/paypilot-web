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
const SchedulePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [payees, setPayees] = useState([]);
  const [selectedPayeeId, setSelectedPayeeId] = useState(null);
  const [payeeName, setPayeeName] = useState("");
  const [payeeAddress, setPayeeAddress] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("Monthly");
  const [scheduledDate, setScheduledDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("BANK_TRANSFER");
  const [payerAccountNumber, setPayerAccountNumber] = useState("");
  const [payeeBankDetails, setPayeeBankDetails] = useState(
    "HDFC Bank, Acc. No. xxxxxxx457, IFSC code HD1230037"
  );

  const [billId, setBillId] = useState(null);

  // Extract the billId from query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const billIdParam = searchParams.get("billId");
    console.log("billIdParam", billIdParam);
    setBillId(billIdParam);
  }, [location.search]);
  // Fetch the list of payees from backend
  useEffect(() => {
    const fetchPayees = async () => {
      try {
        const response = await axios.get("http://localhost:8082/payees"); // Replace with your actual API endpoint
        setPayees(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching payees:", error);
      }
    };

    fetchPayees();
  }, []);

  const handlePayeeChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setSelectedPayeeId(selectedId);

    // Find selected payee's name and address
    const selectedPayee = payees.find((payee) => payee.payeeId === selectedId);
    if (selectedPayee) {
      setPayeeName(selectedPayee.payeeName);
      setPayeeAddress(selectedPayee.payeeAddress);
      setPayeeBankDetails(selectedPayee.payeeBankDetails);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentDetails = {
      paymentFrequency,
      payee: {
        payeeId: selectedPayeeId || 0, // Use the selected payee's ID
        payeeName,
        payeeAddress,
        payeeBankDetails: payeeBankDetails,
      },
      billId: billId || 0, // Include the billId here
      scheduledDate,
      amount: parseFloat(amount),
      paymentMode,
      payerAccountNumber,
      isScheduled: true,
      status: "SCHEDULED",
      updateDate: "",
    };

    try {
      console.log(paymentDetails);
        const response = await SchedulePaymentService.schedulePayment(paymentDetails);
        console.log('Payment scheduled successfully:', response);
      alert("Payment scheduled successfully");
      navigate('/schedule-payments');
    } catch (error) {
      console.error("Error scheduling payment:", error);
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
                  readOnly
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
                  readOnly
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
                value={selectedPayeeId ?? ""}
                onChange={handlePayeeChange}
              >
                <option value="">Choose...</option>
                {payees.map((payee) => (
                  <option key={payee.payeeId} value={payee.payeeId}>
                    {payee.payeeName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="inputPayeeName"
                label="Payee Name"
                value={payeeName}
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="inputPayeeBankDetails"
                label="Payee Bank Details"
                value={payeeBankDetails}
                placeholder="Account: 123456789, Bank: XYZ Bank"
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="inputPayeeAddress"
                label="Payee Address"
                value={payeeAddress}
                placeholder="1234 Main St"
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
               id="inputFrequency" label="Payment Frequency">
                <option>Choose...</option>
                {["ONE_TIME","DAILY","WEEKLY","MONTHLY","QUARTERLY","HALF_YEARLY","ANNUAL"].map(
                  (frequency) => (
                    <option key={frequency} value={frequency} >
                      {frequency.replace("_", " ")}
                    </option>
                  )
                )}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormSelect
                id="inputMethod"
                label="Payment Method"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                required
              >
                <option value="">Choose...</option>
                <option value="Credit_Card">Credit Card</option>
                <option value="Debit_Card">Debit Card</option>
                <option value="Bank_Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                id="inputPayeeAccountNumber"
                label="Payee Account Number"
                placeholder="123456XXXX"
                value={payerAccountNumber}
                onChange={(e) => setPayerAccountNumber(e.target.value)}
                required
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="date"
                id="inputScheduleDate"
                label="Bill Date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="number"
                id="inputAmount"
                label="Amount (in Rs.)"
                placeholder="100000"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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

export default SchedulePayment;
