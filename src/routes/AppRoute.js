import { Switch, Route, Link } from "react-router-dom";
import Login from "../component/Login/Login";
import Users from "../component/ManageUsers/User";
import Register from "../component/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Role from "../component/Role/Role";
import GroupRole from "../component/Group-Role/GroupRole";
const AppRoute = () => {
  return (
    <>
      <Switch>
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/roles" component={Role} />
        <PrivateRoute path="/group-role" component={GroupRole} />
        <Route path="/about">about</Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/" exact>
          home
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};
export default AppRoute;
