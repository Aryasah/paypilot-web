import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Feature.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Feature({ icon, text, to }) {
    // const navigate = useNavigate(); // Hook to programmatically navigate

    // const handleClick = () => {
    //     if (text === "Add New Bill") {
    //         navigate('/addBills'); // Redirect to addBills page
    //     } 
    //     // Add more conditional navigation if needed for other features
    // };

    return (
        <Link to={to} className='link-wrapper'>
            <div className='feature-card'>
                {icon && <FontAwesomeIcon icon={icon} className='feature-card-icon' />}
                <p className='feature-card-text'>{text}</p>
            </div>
        </Link>
    );
}

export default Feature;
