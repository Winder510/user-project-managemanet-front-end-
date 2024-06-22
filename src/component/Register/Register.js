import { useEffect, useState } from "react";
import "./Register.scss";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultObj = {
    isValidEmail: true,
    isValidPhone: true,
    isValidName: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [errors, setErrors] = useState(defaultObj);
  let history = useHistory();

  const handleRegister = async () => {
    if (!isValidInput()) {
      return;
    } else {
      let res = await registerNewUser(email, phone, username, password);
      let serverData = res;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };
  const isValidInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    setErrors(defaultObj);
    if (!email) {
      toast.error("Email is required");
      setErrors({ ...defaultObj, isValidEmail: false });
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      setErrors({ ...defaultObj, isValidEmail: false });
      return false;
    }

    if (!phone) {
      toast.error("Phone number is required");
      setErrors({ ...defaultObj, isValidPhone: false });
      return false;
    } else if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number format");
      setErrors({ ...defaultObj, isValidPhone: false });
      return false;
    }

    if (!username) {
      toast.error("Username is required");
      setErrors({ ...defaultObj, isValidName: false });
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      setErrors({ ...defaultObj, isValidName: false });
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      setErrors({ ...defaultObj, isValidPassword: false });
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setErrors({ ...defaultObj, isValidPassword: false });
      return false;
    }

    if (!confirmPassword) {
      toast.error("Confirm Password is required");
      setErrors({ ...defaultObj, isValidConfirmPassword: false });
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setErrors({ ...defaultObj, isValidConfirmPassword: false });
      return false;
    }

    return true;
  };
  return (
    <div className="register-container d-flex">
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
            <div className="form-group">
              <label className="label-content">Email</label>
              <input
                className={
                  errors.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                placeholder="Email "
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="label-content">Phone number</label>
              <input
                className={
                  errors.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                placeholder="Phone number "
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="label-content">Username</label>
              <input
                className={
                  errors.isValidName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label className="label-content">Password</label>

              <input
                className={
                  errors.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="label-content">Re-enter password</label>
              <input
                className={
                  errors.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="password"
                placeholder="Re_enter password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Đăng kí
            </button>

            <hr />
            <div className="text-center">
              <Link to="/login" className=" btn btn-success">
                Already have account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
