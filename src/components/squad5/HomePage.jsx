import React from 'react';
import './HomePage.css';
import InfoCard from './InfoCard';
import Header from './Header';
import { faCalendarCheck, faListCheck, faMagnifyingGlassDollar  } from '@fortawesome/free-solid-svg-icons';
import Support from './Support';
import { motion } from 'framer-motion';

function HomePage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='homepage'
        >
            {/* <Header /> */}
            <div className='info-card-container'>
                <InfoCard icon={faCalendarCheck} text="Schedule Payment" to="/schedule-bills"/>
                <InfoCard icon={faListCheck} text="Manage Bills" to="/manageBills" />
                <InfoCard icon={faMagnifyingGlassDollar} text="Track Payments" to="/payment/history" />
            </div>
            <Support />
        </motion.div> 
    );
    }

export default HomePage;