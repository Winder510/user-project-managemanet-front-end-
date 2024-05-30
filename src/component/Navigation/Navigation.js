import { useState, useEffect } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
const Navigation = (props) => {
  const [isShow, setIsShow] = useState(false);
  let location = useLocation();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setIsShow(true);
    }
    if (location.pathname === "/login") {
      setIsShow(false);
    }
  }, []);
  return (
    <>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  );
};
export default Navigation;
