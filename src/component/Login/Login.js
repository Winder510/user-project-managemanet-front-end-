import { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassWord] = useState("");

  const { login } = useContext(UserContext);

  let history = useHistory();

  const defaultObj = {
    isValidEmail: true,
    isValidPassword: true,
  };
  const [errors, setErrors] = useState(defaultObj);
  const handleLogin = async () => {
    if (!valueLogin) {
      setErrors({ ...defaultObj, isValidEmail: false });
      toast.error("Vui lòng nhập số ddienj thoại hoặc email");
      return;
    }
    if (!password) {
      setErrors({ ...defaultObj, isValidPassword: false });
      toast.error("Vui lòng nhập vào mật khẩu");
      return;
    }
    let res = await loginUser(valueLogin, password);
    if (+res.EC === 0) {
      let email = res.DT.email;
      let username = res.DT.username;
      let groupWithRole = res.DT.groupWithRole;
      let data = {
        isAuthenticated: true,
        token: res.DT.access_token,
        account: {
          groupWithRole,
          email,
          username,
        },
      };
      localStorage.setItem("jwt", res.DT.access_token);
      login(data);
      history.push("/users");
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
      return;
    }
  };
  const handlePressEnter = (e) => {
    if (e.keyCode === 13 && e.code === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-container d-flex">
      <div className="container">
        <div className="row m-3 m-sm-0">
          <div className="content-left col-sm-6 col-0  d-none d-sm-block m-auto  ">
            <div className="brand fs-1">Facebook</div>
            <div className="haha fs-3">
              Try its yourself Getting started now
            </div>
          </div>
          <div className="content-right d-flex flex-column col-12 col-sm-6 gap-3 py-3  ">
            <h3 className="brand text-center d-block d-sm-none">Facebook</h3>
            <input
              className={
                errors.isValidEmail ? "form-control" : "form-control is-invalid"
              }
              type="text"
              placeholder="Email or your phone number"
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
            />
            <input
              className={
                errors.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              type="password"
              name=""
              id=""
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
              onKeyDown={(e) => handlePressEnter(e)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Đăng nhập{" "}
            </button>
            <a href="#" className="forgot-password text-center ">
              Forgot your password ?
            </a>
            <hr />
            <div className="text-center">
              <Link to="/register" className=" btn btn-success">
                Creat new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
