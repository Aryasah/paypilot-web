import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './InfoCard.css';
import { Link } from 'react-router-dom';

const InfoCard = ({ icon, text, to }) => {
    return (
        <Link to={to} className='link-wrapper'>
            <div className='info-card'>
                <div className='info-card-icon'>
                    <FontAwesomeIcon icon={icon} size='5x' />
                </div>
                <div className='info-card-text'>{text}</div>
            </div>
        </Link>
    );
}

export default InfoCard;