import React, { useEffect, useState } from 'react';
import './RemoveBills.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Header from './Header';
import Dropdown from './Dropdown';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

function RemoveBills() {

    const username = useSelector((state) => state.auth.userId);
    const [list, setList] = useState([]);
    const [selectedBillIds, setSelectedBillIds] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('Other');
    const billsPerPage = 5;

    const categories = ["Utilities", "Subscription", "Rent", "Other"];

    useEffect(() => {
        fetch(`http://papilot.s3-website.ap-south-1.amazonaws.com/bill/all?userId=${username}`)
            .then((response) => response.json())
            .then((data) => {
                setList(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                toast.error("Error fetching bill data. Please try again.");
            })
    }, [username]);

    // Filter bills whenever the category changes
    useEffect(() => {
        filterBills();
    }, [category, list]);

    const handleCheckboxChange = (billId) => {
        setSelectedBillIds((prevSelectedBillIds) =>
          prevSelectedBillIds.includes(billId)
            ? prevSelectedBillIds.filter((id) => id !== billId)
            : [...prevSelectedBillIds, billId]
        );
    };

    const handleDelete = async () => {
        if(selectedBillIds.length === 0) {
            toast.warning('Please select at least one bill to delete.');
            return;
        }

        try {
            const deletePromises = selectedBillIds.map(async (id) => {
                const response = await fetch(`http://papilot.s3-website.ap-south-1.amazonaws.com/bill/remove/${id}?userId=${username}`, {
                    method: 'DELETE',
                });
                return response.ok;
            });

            const results = await Promise.all(deletePromises);

            if(results.every(result => result)) {
                const updatedList = list.filter(bill => !selectedBillIds.includes(bill.billId));
                toast.success('Selected bills deleted successfully.');
                setList(updatedList); // Update state
                setSelectedBillIds([]); // Clear selection
                setFilteredBills(updatedList.filter(bill => bill.billCategory === category));
            } else {
                toast.error('Failed to delete some bills. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting bills:', error);
            toast.error('Error occurred while deleting bills. Please try again.');
        }
    };

    // Pagination logic
    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;
    const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);
    const totalPages = Math.ceil(filteredBills.length / billsPerPage);

    const filterBills = () => {
        if(category) {
            const filtered = list.filter(bill => bill.billCategory === category);
            setFilteredBills(filtered);
            setCurrentPage(1); // Reset to the first page after filtering
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="remove-bills"
        >
            {/* <Header /> */}
            <div>
                <label htmlFor='bill-category'>Bill Category</label>
                <Dropdown 
                    id="bill-category"
                    options={categories}
                    value={category}
                    onChange={handleCategoryChange}
                />
            </div>
            <table className='bills-table'>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Bill Name</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                     {filteredBills.length > 0 ? (
                        filteredBills.map((bill) => (
                            <tr key={bill.billId}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedBillIds.includes(bill.billId)} 
                                        onChange={() => handleCheckboxChange(bill.billId)}
                                    />
                                </td>
                                <td>{bill.billName}</td>
                                <td>{bill.paymentStatus}</td>
                                <td>{bill.amount}</td>
                                <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                            </tr>
                        ))
                     ) : (
                        <tr>
                            <td colSpan="5">No Bills Found</td>
                        </tr>
                     )}   
                </tbody>
            </table>
            {filteredBills.length > 0 && (
                <div className='pagination'>
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
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
            
            <button onClick={handleDelete} className='delete-button'>
                    Delete
            </button>
        </motion.div>
    );
}

export default RemoveBills;