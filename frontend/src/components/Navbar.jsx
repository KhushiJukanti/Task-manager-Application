import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  };

  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className='container mt-3'>
      <nav className="navbar navbar-expand" style={{ backgroundColor: '#106EBE' }}>
        <div className="container-fluid">
          <span>
            <i className="bi bi-calendar2-minus-fill" style={{ color: 'white', paddingLeft: '20px' }}></i>
          </span>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              <li className="nav-item">
                <Link to="/login" className="nav-link logout" style={{
                  color: 'white',
                  backgroundColor: '#cb5609',
                  padding:'5px 10px',
                  borderRadius:'3px',
                  margin:'10px'
                }} onClick={logout}>Logout</Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" style={{ color: 'white' }}>Signup</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" style={{ color: 'white' }}>Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
