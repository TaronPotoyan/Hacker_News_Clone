import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const loggedInUser = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(); 
  };

  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <i className='fa fa-home'> Hacker News</i>
      </Link>
      <nav>
        <ul style={{ listStyle: "none" }} className="nav">
          <li><Link to="/newest">new</Link></li>
          <li><Link to="/past">past</Link></li>
          <li><Link to="/ask">ask</Link></li>
          <li><Link to="/show">show</Link></li>
          <li><Link to="/jobs">jobs</Link></li>
        </ul>
      </nav>
      {loggedInUser ? (
        <div className="logged-in">
          <Link to={"/userpage/"}>{loggedInUser}</Link>
          <button className="login" onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <Link to="/login">
          <button className="login">Log in</button>
        </Link>
      )}
    </div>
  );
}

export default Header;
