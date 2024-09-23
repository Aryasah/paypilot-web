import React from 'react';
import './Dropdown.css';

function Dropdown({ id, options,value, onChange }) {
    return (
        <select id={id} className='dropdown_dropdown' onChange={onChange} value={value}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;