import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            party
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
