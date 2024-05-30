import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navigation from "./component/Navigation/Navigation";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.css";
import AppRoute from "./routes/AppRoute";
const App = (props) => {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    console.log("session", JSON.stringify(session));
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <>
      <Router>
        <div className="app-header">
          {account && !_.isEmpty(account) && account.isAuthenticated && (
            <Navigation />
          )}
        </div>
        <div className="app-container">
          <AppRoute />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </>
  );
};
export default App;
