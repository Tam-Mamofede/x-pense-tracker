import React from "react";
import { NavLink } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <h1> Welcome to the expense tracker web-app</h1>
      <p>
        <NavLink to="sign-up">Get started</NavLink>
      </p>
    </div>
  );
}

export default Homepage;
