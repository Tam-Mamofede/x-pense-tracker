import React from "react";
import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Homepage</NavLink>
        </li>
        <li>
          <NavLink to="/sign-in">Log in</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard </NavLink>
        </li>
        <li>
          <NavLink to="/new-budget">Create a new budget </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
