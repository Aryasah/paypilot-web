import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./OverdueBill.css";
import BillSearchComponent from "./BillSearchComponent";
import Header from "./Header";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_51NPgG9SIMqwS7WNZEIQb2SSsVkXldQO3jNz2OvXM4YTNKbNTKEhyNIuIPYLD7jIEzDYH1G3hsRkaup8C7IffikUd00LiGt3GRA");

const OverdueBill = () => {
  const [list, setList] = useState([]);
  const [selectedBillIds, setSelectedBillIds] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 5;
  const username=useSelector(state=>state.auth.userId)

  useEffect(() => {
    fetch(`http://localhost:8082/bill/overdue?userId=${username}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        setOriginalList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCheckboxChange = (billId) => {
    setSelectedBillIds((prevSelectedBillIds) =>
      prevSelectedBillIds.includes(billId)
        ? prevSelectedBillIds.filter((id) => id !== billId)
        : [...prevSelectedBillIds, billId]
    );
  };

  const handlePayNowClick = async () => {
    const stripe = await stripePromise;
    const selectedBills = list.filter((bill) =>
      selectedBillIds.includes(bill.billId)
    );

    if (selectedBills.length === 0) {
      toast.warning("Please select at least one bill to proceed with payment.");
      return;
    }

    const paymentDetails = {
      bills: selectedBills.map((bill) => ({
        name: bill.billName,
        category: bill.billCategory,
        amountDue: bill.amount,
        totalAmount: bill.amount,
      })),
      customer: {
        name: username,
        address: {
          line1: "123 Main St",
          state: "MH",
          city: "Mumbai",
          postal_code: "400001",
          country: "IN",
        },
      },
    };

    try {
      const response = await fetch("http://localhost:8085/bill/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
      });

      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Error occurred while processing payment.");
    }
  };

  // Pagination logic
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = list.slice(indexOfFirstBill, indexOfLastBill);
  const totalPages = Math.ceil(list.length / billsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="overdue-bill-page"
    >
      <Header />
      <div>
        <BillSearchComponent handleListChange={setList} originalList={originalList} />
      </div>

      <div className="table-container">
        <table className="overdue-table">
          <thead>
            <tr>
              <th></th>
              <th>Bill Name</th>
              <th>Amount Due</th>
              <th>Total Amount</th>
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
                      checked={selectedBillIds.includes(data.billId)}
                      onChange={() => handleCheckboxChange(data.billId)}
                    />
                  </td>
                  <td>{data.billName}</td>
                  <td>{data.amount}</td>
                  <td>{data.amount}</td>
                  <td>{data.dueDate}</td>
                  <td>{Math.floor((new Date() - new Date(data.dueDate)) / (1000 * 60 * 60 * 24))} days</td>
                  <td>{data.paymentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-bills">No bills found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {list.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      
      <div className="menu-buttons">
        <Link to="/manageBills/overdueUpcoming" className="btn btn-primary">Back</Link>
        <Link onClick={handlePayNowClick} className="btn btn-primary">Pay Now</Link>
        <Link to="/manageBills" className="btn btn-primary">Manage Bills</Link>
      </div>
    </motion.div>
  );
};

export default OverdueBill;
