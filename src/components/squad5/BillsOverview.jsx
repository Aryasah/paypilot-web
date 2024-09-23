import React, { useState } from 'react';
import './BillsOverview.css';
import Header from './Header';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';
import { Link, useNavigate } from 'react-router-dom';

function BillsOverview() {

    const [category, setCategory] = useState('Utilities');
    const [fromDate, setFromDate] = useState('2024-01-01'); // Default values, update as needed
    const [toDate, setToDate] = useState('2024-12-31');     // Default values, update as needed
    const [status, setStatus] = useState('Unpaid');           // Default status
    const navigate = useNavigate();
    console.log(status)
    const handleSubmit = () => {
        let path;
        
        switch(category) {
            case 'Rent':
                path = '/manageBills/billsOverview/rent';
                break;

            case 'Utilities':
                path = '/manageBills/billsOverview/utilities';
                break;

            case 'Subscription':
                path = '/manageBills/billsOverview/subscription';
                break;

            case 'Others':
                path= '/manageBills/billsOverview/others';
                break;

            default:
                path = '/manageBills/billsOverview'; // Default path if none match
                break;
        }

        navigate(path, {
            state: {
                category,
                fromDate,
                toDate,
                status
            }
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='bills-overview'
        >
            {/* <Header /> */}
            <InfoCard icon={faListCheck} text="Manage Bills" to='/manageBills' />
            <h2>Bills Overview</h2>
            <div className='overview-content'>
                <div className='form-group'>
                    <label htmlFor='bill-category'>Bill Category</label>
                    <Dropdown
                        id='bill-category'
                        options={['Utilities', 'Subscription', 'Rent', 'Others']}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='bill-date-from'>Bill Date From</label>
                    <DatePicker id='bill-date-from' onChange={(date) => setFromDate(date)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='bill-date-to'>Bill Date To</label>
                    <DatePicker id='bill-date-to' onChange={(date) => setToDate(date)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='bill-status'>Bill Status</label>
                    <Dropdown
                        id='bill-status'
                        options={['Paid', 'Unpaid']}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
            </div>
            <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </motion.div>
    );
}

export default BillsOverview;