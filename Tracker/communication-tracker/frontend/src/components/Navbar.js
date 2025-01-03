// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-semibold text-xl">
          <Link to="/" className="hover:text-indigo-200">Dashboard</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/admin" className="text-white hover:text-indigo-200">Admin</Link>
          <Link to="/dashboard" className="text-white hover:text-indigo-200">User</Link>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
