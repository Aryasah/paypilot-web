import React from 'react';
import './Success.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function Success() {
    return (
        <motion.div
            className="success-page"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='success-container'>
                <FontAwesomeIcon icon={faCircleCheck} className='success-icon' />
                <h1 className='success-heading'>Payment Successful!</h1>
                <p className='success-message'>
                    Thank you for your payment! Your transaction has been successfully processed.
                </p>
                <Link
                    to="/" className='btn btn-success'
                >
                    Go to Homepage
                </Link>
                <Link
                    to="/manageBills" className='btn btn-secondary'
                >
                    Manage More Bills
                </Link>
            </div>
        </motion.div>
    );
}

export default Success;