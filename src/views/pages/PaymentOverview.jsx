import { cilAvTimer } from "@coreui/icons";
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
  CTableRow,
} from "@coreui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { PaymentService } from "src/services/api-services";

const PaymentOverview = () => {
  const [payments, setPayments] = useState([]);
  const [category, setCategory] = useState([]);
  const [userId, setUserId] = useState("amansah");
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const fetchPaymentOverview = async () => {
    try {
      const response = await PaymentService.getPaymentOverview(
        category,
        fromDate,
        toDate,
        userId
      );
      console.log("response", response);
      setPayments(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPaymentOverview();
  }, [category, fromDate, toDate]);
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
                  Bill
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Total Amount
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Due Date
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">
                  Overdue By
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Payment Status
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {payments && payments.length > 0 ? (
                payments.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="ps-3">
                      <div>{item.billName}</div>
                      <div className="small text-body-secondary text-nowrap">
                        <span>{item.billCategory}</span> | Notes: {item.notes}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="">
                      <div className="small text-body-secondary text-nowrap">
                        {item.amount}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      {item?.dueDate &&
                        moment(item.dueDate).format("MMM DD, YYYY")}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.paymentStatus === "Paid" ? (
                        <></>
                      ) : moment(item.dueDate).diff(today, "days") > 0 ? (
                        <div className="d-flex align-items-center">
                          <CIcon icon={cilAvTimer} />
                          <p className="mb-0">
                            Due in {moment(item.dueDate).diff(today, "days")}{" "}
                            days
                          </p>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <CIcon
                            style={{
                              color: "#D9534F",
                            }}
                            icon={cilAvTimer}
                          />
                          &nbsp;
                          <p className="mb-0 text-danger">
                            Overdue by{" "}
                            {moment(today).diff(item.dueDate, "days")} days
                          </p>
                        </div>
                      )}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {item?.paymentStatus === "Paid" ? (
                        <p className="text-success mb-0">Paid</p>
                      ) : (
                        <p className="text-danger mb-0">
                          {item?.paymentStatus}
                        </p>
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
                    No payments found
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

export default PaymentOverview;
