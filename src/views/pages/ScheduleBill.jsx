import {
    cilAvTimer
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormSelect,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SchedulePaymentService } from "src/services/api-services";

const ScheduleBill = () => {
  const [schedulePayments, setSchedulePayments] = useState([]);
  const [category, setCategory] = useState("All");
  const userId = useSelector((state) => state.auth.userId);
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const fetchBillByCategory = async () => {
    if(!userId) return;
    try {
      const response = await SchedulePaymentService.getBillsByCategory(
        userId,
        category,
        fromDate,
        toDate
      );
      console.log("response", response);
      if(!response) {
        setSchedulePayments([]);
        return;
      };
      const filteredResponse = response.filter(
        (item) => item?.paymentStatus != "Paid"
      )
      setSchedulePayments(filteredResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBillByCategory();
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
                  Bill Id
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Bill
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Total Amount
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Due Date
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Billing Cycle
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {schedulePayments && schedulePayments.length > 0 ? (
                schedulePayments.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="ps-4">
                      {item.billId}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.billName}</div>
                      <div className="small text-body-secondary text-nowrap">
                        <span>{item.billCategory}</span> | Notes: {item.notes}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="">{item.amount}</CTableDataCell>
                    <CTableDataCell>
                      {item?.dueDate &&
                        moment(item.dueDate).format("MMM DD, YYYY")}
                    </CTableDataCell>
                    <CTableDataCell className="">
                      {item.isRecurring === "Y" ? "Recurring" : "Non-Recurring"}
                    </CTableDataCell>
                    <CTableDataCell className="ps-4">
                      <Link to={`/schedule-payment/create?billId=${item.billId}`}>
                        <CIcon
                          icon={cilAvTimer}
                          size="lg"
                          style={{
                            cursor: "pointer",
                            color: "white",
                            marginRight: "10px",
                          }}
                        />
                      </Link>
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
                    No bills found
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

export default ScheduleBill;
