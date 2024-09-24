import React, { useEffect, useState } from "react";
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormSelect,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilWallet,
  cilPencil,
  cilX,
} from "@coreui/icons";
import PaymentIcon from "src/components/shared/PaymentIcon";
import moment from "moment";
import { SchedulePaymentService } from "src/services/api-services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const data = [
  {
    schedulePaymentId: 1,
    paymentFrequency: "Quarterly",
    payee: {
      payeeId: 1,
      payeeName: "Jane Doe",
      payeeAddress: "123 Main St, Springfield",
      payeeBankDetails: "Account: 123456789, Bank: XYZ Bank",
    },
    scheduledDate: "2024-09-17",
    amount: 540.0,
    paymentMode: "BANK_TRANSFER",
    payerAccountNumber: "9876543210",
    status: "SCHEDULED",
    scheduled: true,
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
const SchedulePaymentList = () => {
  const [schedulePayments, setSchedulePayments] = useState([]);
  const [category, setCategory] = useState("All");
  const userId = useSelector((state) => state.auth.userId);
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const navigate = useNavigate();
  const fetchScheduledPayments = async () => {
    if (!userId) 
    {
      alert("Please login to view scheduled payments");
      return;
    }
    try {
      const response = await SchedulePaymentService.getScheduledPayments(
        userId
      );
      console.log("response", response);
      if(!response) {
        setSchedulePayments([]);
        return;
      };
      setSchedulePayments(
        response.filter(
          (item) => item.bill.billCategory === category || category === "All"
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelPayment = async (scheduledPaymentId) => {
    try {
      await SchedulePaymentService.cancelScheduledPayment(scheduledPaymentId);
      fetchScheduledPayments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModifyPayment = (payment) => {
    navigate("/schedule-payment/modify", { state: { payment } });
  };
  useEffect(() => {
    fetchScheduledPayments();
  }, [fromDate, toDate, category]);
  return (
    <CCol xs>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            {/* First div with category select */}
            <div className="d-flex align-items-center" style={{ width: "20%" }}>
              <label htmlFor="category" className="form-label mt-2 me-2">
                Category
              </label>
              <CFormSelect
                id="category"
                aria-label="Select Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ flex: 1 }}
              >
                <option value="All">All</option>
                <option value="Utilities">Utilities</option>
                <option value="Rent">Rent</option>
                <option value="Loans">Loans</option>
                <option value="Event">Event</option>
                <option value="Groceries">Groceries</option>
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
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="col-sm-6 d-flex justify-content-between align-items-center">
                <label
                  style={{ width: "120px" }}
                  htmlFor="endDate"
                  className="form-label mt-2 me-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary ps-3">
                  Payment Id
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Bill
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Payment Method
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Due Date
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Schedule Date
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {schedulePayments && schedulePayments.length > 0 ? (
                schedulePayments.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="ps-4">
                      {item.scheduledPaymentId}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.bill.billName}</div>
                      <div className="small text-body-secondary text-nowrap">
                        <span>{item.bill.billCategory}</span> | Notes:{" "}
                        {item.bill.notes}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="">
                      <div className="d-flex align-items-center">
                        <PaymentIcon paymentMethod={item.paymentMode} />
                        &nbsp;
                        <p className="mb-0">{item.paymentMode}</p>
                      </div>
                      <div className="small text-body-secondary text-nowrap">
                        Amount: {item.amount}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      {item?.bill?.dueDate &&
                        moment(item.bill.dueDate).format("MMM DD, YYYY")}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.status === "SCHEDULED"
                        ? item?.scheduledDate &&
                          moment(item.scheduledDate).format("MMM DD, YYYY")
                        : item.status}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.status === "SCHEDULED" && (
                        <>
                          <CIcon
                            icon={cilPencil}
                            className="me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleModifyPayment(item)}
                          />
                          <CIcon
                            icon={cilX}
                            className="ms-2"
                            style={{
                              cursor: "pointer",
                              color: "#D9534F",
                              fontWeight: "bold",
                            }}
                            onClick={() =>
                              handleCancelPayment(item.scheduledPaymentId)
                            }
                          />
                        </>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow
                  style={{
                    minHeight: "300px",
                    height: "300px",
                  }}
                >
                  <CTableDataCell colSpan="6" className="text-center">
                    No data available
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default SchedulePaymentList;
