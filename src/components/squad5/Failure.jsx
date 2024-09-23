import React from 'react';
import './Failure.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Failure() {
    return (
        <motion.div
            className="failure-page"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='failure-container'>
                <FontAwesomeIcon icon={faTimesCircle} className='failure-icon' />
                <h1 className='failure-heading'>Payment Failed!</h1>
                <p className='failure-message'>
                    We are sorry, but there was an issue processing your payment. Please try again.
                </p>
                <Link to="/" className="btn btn-danger">
                    Go to Homepage
                </Link>
            </div>
        </motion.div>
    );
}

export default Failure;