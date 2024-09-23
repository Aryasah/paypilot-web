import React, { useEffect, useState } from 'react';
import './BillDetailsPage.css';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

function BillDetailsPage() {
    const location = useLocation();
    const { category, fromDate, toDate, status } = location.state || {}; // Get the state passed from the previous page

    const [billsData, setBillsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const billsPerPage = 4; // You can adjust the number of bills per page
    
    useEffect(() => {
        // Fetch bills based on category, fromDate, toDate, and status
        const fetchBills = async () => {
            try {
                const response = await fetch(`http://localhost:8082/bill/overview?category=${category}&fromDate=${fromDate}&toDate=${toDate}&status=${status}&userId=user123`);
                if (response.ok) {
                    const data = await response.json();
                    setBillsData(data); // Set the fetched data to billsData state
                } else {
                    console.error('Failed to fetch bills');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (category && fromDate && toDate && status) {
            fetchBills();
        }
    }, [category, fromDate, toDate, status]); // Fetch data when these dependencies change

    // Pagination logic
    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;
    const currentBills = billsData.slice(indexOfFirstBill, indexOfLastBill);
    const totalPages = Math.ceil(billsData.length / billsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <motion.div
            className='bill-details-page'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* <Header /> */}
            <InfoCard icon={faListCheck} text="Manage Bills" to='/manageBills' />
            <Link to='/manageBills/billsOverview/allDetails' className='link-wrapper'>
                <h2>{category}</h2>
            </Link>
            <div className='bills-table-container'>
                <table className='bills-table'>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Bill Name</th>
                            <th>Due Date</th>
                            <th>Reminder Frequency</th>
                            <th>Notes</th>
                            <th>Total Amount (in ₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billsData.length > 0 ? (
                            billsData.map((bill, index) => (
                                <tr key={bill.id}>
                                    <td>{index + 1}</td>
                                    <td>{bill.billName}</td>
                                    <td>{bill.dueDate}</td>
                                    <td>{bill.reminderFrequency}</td>
                                    <td>{bill.notes}</td>
                                    <td>{bill.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No bills found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {billsData.length > 0 && (
                    <div className="pagination">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="pagination-btn"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default BillDetailsPage;