import React from 'react';
import './Support.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCopyright, faHeadset } from '@fortawesome/free-solid-svg-icons';

function Support() {
    return (
        <div className='support-container'>
            <FontAwesomeIcon icon={faHeadset} size='5x' />
            <div className='support-details'>
                <p>If you have any queries, please kindly contact us.</p>
                <p className='support-contact-details'>
                    <FontAwesomeIcon icon={faPhone} className='fa-icon' />
                    +91 123-456-7890
                </p>
                <p className='support-contact-details'>
                    <FontAwesomeIcon icon={faEnvelope} className='fa-icon' />
                    abc@paypilot.com
                </p>
            </div>
            <div className='copyright'>
                <p>
                    <FontAwesomeIcon icon={faCopyright} />
                    {new Date().getFullYear()} PayPilot. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default Support;