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
          <li><Link to="/new">new</Link></li>
          <li><Link to="/post">post</Link></li>
          <li><Link to="/comments">comments</Link></li>
          <li><Link to="/ask">ask</Link></li>
          <li><Link to="/show">show</Link></li>
          <li><Link to="/jobs">jobs</Link></li>
          <li><Link to="/submit">submit</Link></li>
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
