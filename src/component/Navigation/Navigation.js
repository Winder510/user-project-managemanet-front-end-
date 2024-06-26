import { useState, useEffect } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Navigation = (props) => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  console.log("User", user);
  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        {
          <div className="topnav">
            <NavLink to="/" exact>
              Home
            </NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/project">Project</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        }
      </>
    );
  } else {
    return <></>;
  }
};
export default Navigation;
