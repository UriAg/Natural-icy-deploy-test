import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("isLogged")) || false
  );

  const handleLogin = (userLogged) => {
    setUser(userLogged);
    setIsLogged(true);
    localStorage.setItem("userInfo", JSON.stringify({ email: userLogged.email, rol: userLogged.rol }));
    localStorage.setItem("isLogged", JSON.stringify(true));
  };

  const logoutContext = () => {
    setUser({});
    setIsLogged(false);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("userTokenAccess");
  };

  let data = {
    user,
    isLogged,
    handleLogin,
    logoutContext,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextComponent;
