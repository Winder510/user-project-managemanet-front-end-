import { useState, createContext } from "react";

const UserContext = createContext({
  isAuthenticated: false,
  token: "",
  account: {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    token: "",
    account: {},
  });

  // Login updates the user data with a name parameter
  const login = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logout = (userData) => {
    setUser("");
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
