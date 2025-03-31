import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h2>My Blog</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blogs">Blog List</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
