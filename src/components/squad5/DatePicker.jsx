import React from 'react';
import './DatePicker.css';

function DatePicker({ id }) {
    return (
        <input 
            type='date'
            id={id}
            className='date-picker'
        />
    );
}

export default DatePicker;