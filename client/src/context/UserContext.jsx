import React, { useEffect, useState, createContext, useContext } from "react";

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userAuth, setUserAuth] = useState(() => {
    return localStorage.getItem("userAuth") === "true";
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole")
      ? JSON.parse(localStorage.getItem("userRole"))
      : null;
  });

  // Guardar los datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userAuth", userAuth);
    localStorage.setItem("userRole", JSON.stringify(userRole));
  }, [user, userAuth, userRole]);

  return (
    <UserContext.Provider
      value={{ user, setUser, userAuth, setUserAuth, userRole, setUserRole }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
