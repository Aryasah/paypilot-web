import React, { useEffect, useState } from 'react';
import './ReminderSettings.css';
import { motion } from 'framer-motion';
import Header from './Header';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';

function ReminderSettings() {

    const [category, setCategory] = useState('Utilities');
    const [billName, setBillName] = useState('');
    const [showReminderOptions, setShowReminderOptions] = useState(false);
    const [bills, setBills] = useState([]);
    const [billOptions, setBillOptions] = useState([]);
    const [isRecurring, setIsRecurring] = useState(false);

    useEffect(() => {
        if(category) {
            fetch('http://papilot.s3-website.ap-south-1.amazonaws.com/bill/all?userId=user123')
                .then(response => response.json())
                .then(data => {
                    // Filter bills based on the selected category
                    const filteredBills = data.filter(bill => bill.billCategory === category);
                    const billNames = filteredBills.map(bill => bill.billName);
                    setBillOptions(billNames);

                    if(billNames.length !== 0) {
                        setBillName(billNames[0]);
                        setShowReminderOptions(true);
                    } else {
                        setBillName('');
                        setShowReminderOptions(false);
                    }
                })
                .catch(error => {
                    console.error('Error fetching bills:', error);
                });
        } else {
            setBillOptions([]); // Clear the Bill Name options when no category is selected
            setBillName('');
            setShowReminderOptions(false);
        }
    }, [category]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleBillNameChange = (e) => {
        setBillName(e.target.value);
        setShowReminderOptions(!!category && !!e.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='reminder-settings-page'
        >
            {/* <Header /> */}
            <InfoCard icon={faListCheck} text="Manage Bills" to='/manageBills' />
            <div className='settings-container'>
                {/* Left Side Div */}
                <div className='left-side'>
                    <div className='form-group'>
                        <label htmlFor="bill-category">Bill Category</label>
                        <Dropdown 
                            id="bill-category"
                            options={['Utilities', 'Subscription', 'Rent', 'Others']}
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bill-name'>Bill Name</label>
                        <Dropdown 
                            id="bill-name"
                            options={billOptions}
                            onChange={handleBillNameChange}
                        />
                    </div>
                </div>

                {/* Right Side Div */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: showReminderOptions ? 1 : 0, scale: showReminderOptions ? 1 : 0.5 }}
                    transition={{ duration: 0.5 }}
                    className='right-side'
                >
                    {showReminderOptions && (
                        <>
                            <div className='upper-right'>
                                <div className='form-group'>
                                <label htmlFor="reminder-frequency">Reminder Frequency</label>
                                    <Dropdown
                                        id="reminder-frequency"
                                        options={['Daily', 'Weekly', 'Monthly']}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="message-customization">Message Customization</label>
                                    <textarea
                                        id="message-customization"
                                        placeholder="Customize your reminder message"
                                        rows="2"
                                    />
                                </div>
                            </div>

                            <div className='lower-right'>
                                <div className='form-group'>
                                    <label htmlFor="reminder-date">Reminder Starting Date</label>
                                    <DatePicker 
                                        id="reminder-date"
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="notification-preference">Notification Preferences</label>
                                    <Dropdown
                                        id="notification-preference"
                                        options={['Email', 'SMS', 'Push Notifications']}
                                    />
                                </div>
                            </div>

                            <div className='form-group recurring-switch'>
                                <label htmlFor="recurring-bill">Recurring Bill</label>
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

                            <button className='submit-btn'>Submit</button>
                        </>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ReminderSettings;