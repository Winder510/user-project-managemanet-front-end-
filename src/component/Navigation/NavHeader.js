import "./Nav.scss";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../logo.svg";
import { logoutUser } from "../../services/userService";
const NavHeader = (props) => {
  const { user, logout } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    localStorage.removeItem("jwt"); // clear localstorage
    let res = await logoutUser(); // clear cookie
    logout();
    if (res && +res.EC === 0) {
      history.push("/login");
    }
  };
  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        {
          <div className="topnav">
            <Navbar expand="lg" className="bg-light">
              <Container>
                <Navbar.Brand href="#home">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                  React
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavLink to="/users" className="nav-link">
                      Users
                    </NavLink>
                    <NavLink to="/roles" className="nav-link">
                      Role
                    </NavLink>
                    <NavLink to="/group-role" className="nav-link">
                      Group-Role
                    </NavLink>
                    <NavLink to="/project" className="nav-link">
                      Project
                    </NavLink>
                    <NavLink to="/about" className="nav-link">
                      About
                    </NavLink>
                  </Nav>
                  <Nav>
                    {user && user.isAuthenticated === true ? (
                      <>
                        <Nav.Item className="nav-link ">
                          Welcome {user.account.username}
                        </Nav.Item>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                          <NavDropdown.Item>Change password</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => handleLogout()}>
                            Log out
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    ) : (
                      <>
                        <Nav.Item className="nav-link">Login</Nav.Item>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        }
      </>
    );
  } else {
    return <></>;
  }
};
export default NavHeader;
