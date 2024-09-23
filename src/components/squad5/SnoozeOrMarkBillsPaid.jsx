import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import "./SnoozeOrMarkBillsPaid.css";
import SnoozeHelper from "./SnoozeHelper";
import Header from "./Header";
import { useSelector } from "react-redux";

const SnoozeOrMarkBillsPaid = () => {
  const [selectedBills, setSelectedBills] = useState([]);
  const [snoozeDate, setSnoozeDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [billsData, setBillsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 4;

  const username = useSelector((state) => state.user);
  useEffect(() => {
    fetch(`http://localhost:8080/bill/all?userId=${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const today = new Date();
        const updatedData = data.map((bill) => {
          if (bill.paymentStatus.toLowerCase() === "paid") {
            return {
              ...bill,
              overdueBy: "0 days",
              paymentStatus: "Paid",
              amountDue: bill.amount,
              totalAmount: bill.amount,
            };
          } else {
            const dueDate = new Date(bill.dueDate);
            const timeDifference = today - dueDate;
            const overdueDays = Math.floor(
              timeDifference / (1000 * 60 * 60 * 24)
            );
            return {
              ...bill,
              overdueBy: overdueDays > 0 ? `${overdueDays} days` : "0 days",
              amountDue: bill.amount,
              totalAmount: bill.amount,
            };
          }
        });
        setBillsData(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
        toast.error("Error fetching bills data.");
      });
  }, [username]);

  const handleCheckboxChange = (billName) => {
    setSelectedBills((prevSelectedBills) =>
      prevSelectedBills.includes(billName) ? [] : [billName]
    );
  };

  const handleSnooze = () => {
    if (selectedBills.length > 0) {
      const billToSnooze = billsData.find(
        (bill) =>
          selectedBills.includes(bill.billName) && bill.paymentStatus !== "Paid"
      );

      if (billToSnooze) {
        const billData = {
          billId: billToSnooze.billId,
          billName: billToSnooze.billName,
          billCategory: billToSnooze.billCategory,
          dueDate: snoozeDate.toISOString().split("T")[0],
          amount: billToSnooze.amount,
          reminderFrequency: billToSnooze.reminderFrequency,
          attachment: billToSnooze.attachment,
          notes: billToSnooze.notes,
          isRecurring: billToSnooze.isRecurring,
          paymentStatus: billToSnooze.paymentStatus,
        };

        fetch(
          `http://localhost:8080/bill/snooze?newDate=${
            snoozeDate.toISOString().split("T")[0]
          }&userId=${username}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(billData),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const updatedData = billsData.map((bill) => {
              if (bill.billId === billToSnooze.billId) {
                return {
                  ...bill,
                  dueDate: snoozeDate.toISOString().split("T")[0],
                  overdueBy: "0 days",
                };
              }
              return bill;
            });
            setBillsData(updatedData);
            setSelectedBills([]);
            toast.success(
              `Bill successfully snoozed until ${snoozeDate.toDateString()}`
            );
          })
          .catch((error) => {
            console.error("Error snoozing bill:", error);
            toast.error("There was an error snoozing the bill.");
          });
      }
    } else {
      toast.warn("Please select a bill to snooze.");
    }
  };

  const handleMarkPaid = () => {
    if (selectedBills.length === 1) {
      const billToUpdate = billsData.find((bill) =>
        selectedBills.includes(bill.billName)
      );

      const billPayload = {
        billId: billToUpdate.billId,
        billName: billToUpdate.billName,
        billCategory: billToUpdate.billCategory,
        dueDate: billToUpdate.dueDate,
        amount: billToUpdate.amount,
        reminderFrequency: billToUpdate.reminderFrequency,
        attachment: billToUpdate.attachment,
        notes: billToUpdate.notes,
        isRecurring: billToUpdate.isRecurring,
        paymentStatus: "paid",
      };

      fetch(`http://localhost:8080/bill/markAsPaid?userId=${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billPayload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const updatedData = billsData.map((bill) => {
            if (bill.billId === billToUpdate.billId) {
              return { ...bill, paymentStatus: "Paid", overdueBy: "0 days" };
            }
            return bill;
          });
          setBillsData(updatedData);
          setSelectedBills([]);
          toast.success("Bill marked as paid!");
        })
        .catch((error) => {
          console.error("Error marking bill as paid:", error);
          toast.error("There was an error marking the bill as paid.");
        });
    } else {
      toast.warn("Please select exactly one bill to mark as paid.");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredData = billsData.filter((bill) => {
    const matchesSearchTerm = bill.billName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || bill.billCategory === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = filteredData.slice(indexOfFirstBill, indexOfLastBill);
  const totalPages = Math.ceil(filteredData.length / billsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="snooze-bill-page"
    >
      {/* <Header /> */}
      <div>
        <SnoozeHelper
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="table-container">
        <table className="bill-table">
          <thead>
            <tr>
              <th></th>
              <th>Bill Name</th>
              <th>Amount Due in Rs</th>
              <th>Total Amount in Rs</th>
              <th>Due Date</th>
              <th>Overdue By</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {currentBills.length > 0 ? (
              currentBills.map((data, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedBills.includes(data.billName)}
                      onChange={() => handleCheckboxChange(data.billName)}
                    />
                  </td>
                  <td>{data.billName}</td>
                  <td>{data.amountDue}</td>
                  <td>{data.totalAmount}</td>
                  <td>{data.dueDate}</td>
                  <td>{data.overdueBy}</td>
                  <td>{data.paymentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No bills found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {currentBills.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <div className="action-buttons">
        <div>
          <label>Snooze Until:</label>
          <input
            type="date"
            id="snooze-date"
            className="date-picker"
            onChange={(e) => setSnoozeDate(new Date(e.target.value))}
          />
          <button onClick={handleSnooze} className="btn btn-warning">
            Snooze
          </button>
          <button onClick={handleMarkPaid} className="btn btn-success">
            Mark as Paid
          </button>
        </div>
      </div>

      <div className="menu-buttons">
        <Link to="/manageBills" className="btn btn-primary">
          Manage Bills
        </Link>
      </div>
    </motion.div>
  );
};

export default SnoozeOrMarkBillsPaid;
