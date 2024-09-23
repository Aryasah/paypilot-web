import React, { useEffect, useState } from 'react';
import './AddBills.css';
import { motion } from 'framer-motion';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';



function AddBills() {
    // Get the username from the Redux store
    const username = useSelector((state) => state.user);

    const [billName, setBillName] = useState('');
    const [category, setCategory] = useState('');
    const [billDate, setBillDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState('');
    const [reminderFrequency, setReminderFrequency] = useState('');
    const [notes, setNotes] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const navigate = useNavigate();

    const attachment = "attachment.pdf";

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the user is logged in
        if(!username) {
            toast.warning('Please log in to add a new bill.');
            navigate('/login');  // Redirect to the login page if needed
            return;
        }
        
        // Create the JSON object
        const billData = {
            billName: billName,
            billCategory: category,
            dueDate: dueDate,
            amount: parseFloat(amount), // Ensure amount is a number
            reminderFrequency: reminderFrequency,
            attachment: attachment,
            notes: notes,
            isRecurring: isRecurring ? 'Y' : 'N',
            paymentStatus: 'Unpaid',
            userId: username,
        }

        // Console log data for debugging
        console.log('Sending Data:', JSON.stringify(billData));
        
        

        // Simple validation (you can add more detailed validation here if needed)
        if (!billName || !category || !dueDate || !amount || !reminderFrequency) {
            toast.warning('Please fill in all required fields.');
            return;
        }

        try {
            // Send POST request to the API
            const response = await fetch('http://localhost:8080/bill/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);

                // Show success message
                toast.success('Bill saved successfully!');
            } else {
                // Handle non-200 responses here
                toast.error('Failed to save bill. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error occurred while saving bill. Please try again.');
        }

        // Clear form after submission
        setBillName('');
        setCategory('');
        setBillDate('');
        setDueDate('');
        setAmount('');
        setReminderFrequency('');
        setNotes('');
        setIsRecurring(false);

        // Show success message
        // alert('Bill saved successfully!');
        // toast.success('Bill saved successfully!');

    };

    const handleCancel = () => {
        // Navigate to Manage Bills page when cancel button is pressed
        navigate('/manageBills');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='add-bills-container'
        >
            {/* <Header /> */}
            <div className="add-bill-form">
                <h2 className='add-bill-heading'>Add New Bill</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>Bill Name</label>
                        <input 
                            type="text" 
                            value={billName} 
                            onChange={(e) => setBillName(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Bill Category</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Subscription">Subscription</option>
                            <option value="Rent">Rent</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <label>Due Date</label>
                        <input 
                            type="date" 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Amount</label>
                        <input 
                            type="text" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Reminder Frequency</label>
                        <select 
                            value={reminderFrequency} 
                            onChange={(e) => setReminderFrequency(e.target.value)} 
                            required
                        >
                            <option value="">Select Frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <label>Notes (if any)</label>
                        <textarea 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)} 
                        />
                    </div>
                    <div className="form-row form-row-recurring">
                        <label>Recurring Bill</label>
                        <div className='toggle-switch'>
                            <input 
                                type='checkbox'
                                id='recurring-toggle'
                                checked={isRecurring} 
                                onChange={() => setIsRecurring(!isRecurring)} 
                            />
                            <label className="slider" htmlFor="recurring-toggle"></label>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="button cancel-button" onClick={handleCancel}>Cancel</button>
                        <button onClick={handleSubmit} className="button save-button">Save</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default AddBills;
