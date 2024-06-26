import { useState, createContext, useEffect } from "react";
import { getUserAccount } from "../services/userService";
const UserContext = createContext({
  isAuthenticated: false,
  token: "",
  account: {},
});

const UserProvider = ({ children }) => {
  const defaultUser = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(defaultUser);
  // Login updates the user data with a name parameter
  const login = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser({ ...defaultUser, isLoading: false });
  };

  const fetchUserAccount = async () => {
    let res = await getUserAccount();
    if (res && +res.EC === 0) {
      let email = res.DT.email;
      let username = res.DT.username;
      let groupWithRole = res.DT.groupWithRole;
      let data = {
        isLoading: false,
        isAuthenticated: true,
        token: res.DT.access_token,
        account: {
          groupWithRole,
          email,
          username,
        },
      };
      setTimeout(() => {
        setUser(data);
      }, 500);
    } else {
      setUser({ ...defaultUser, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      fetchUserAccount();
    } else {
      setUser({ ...user, isLoading: false });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
