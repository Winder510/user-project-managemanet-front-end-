import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import NavHeader from "./component/Navigation/NavHeader";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.css";
import AppRoute from "./routes/AppRoute";
import { Audio } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
const App = (props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Router>
        {user && user.isLoading ? (
          <>
            <div className="loading-container">
              <Audio
                height="80"
                width="80"
                radius="9"
                color="#0866ff"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
              <div>Loading...</div>
            </div>
          </>
        ) : (
          <>
            <div className="app-header">
              <NavHeader />
            </div>
            <div className="app-container">
              <AppRoute />
            </div>
          </>
        )}

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
