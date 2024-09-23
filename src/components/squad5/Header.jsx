import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/store/authSlice';

function Header() {

    // Get the username from the Redux store
    const username = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user'); // Clear the user from localStorage
        navigate('/login');
    };

    return (
        <div className='header'>
            <Link to="/" className='link-wrapper'>
                <div className='logo'>PayPilot</div>
            </Link>
            <div className='tab-container'>
                <div className='tab'>
                    <FontAwesomeIcon icon={faBell} className='fa-icon' />   
                    Notification
                </div>
                <div className='tab'>
                    {username ? (
                        <span onClick={handleLogout}>{username}</span>
                    ) : (
                        <Link className='link-wrapper' to='/login'>
                            Login
                        </Link>
                    )}
                    <FontAwesomeIcon icon={faUser} className='fa-icon' />
                </div>
            </div>
        </div>
    );
}

export default Header;