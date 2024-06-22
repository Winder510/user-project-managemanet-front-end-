import { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const PrivateRoute = (props) => {
  let history = useHistory();
  const { user } = useContext(UserContext);
  alert(user);
  console.log("check user context", user);
  useEffect(() => {
    console.log("check user context", user);
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
      console.log("yes");
    }
  }, []);

  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};
export default PrivateRoute;
