import { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);

  if (user && user.isAuthenticated === true) {
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  } else {
    return (
      <>
        <Redirect to="/login" />
      </>
    );
  }
};
export default PrivateRoute;
