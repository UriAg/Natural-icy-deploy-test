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
    const now = new Date().getTime();
    // const expiration = now + (24 * 60 * 60 * 1000);
    const expiration = now + (60 * 1000);
    localStorage.setItem('expirationLoginDate', expiration)
  };

  const logoutContext = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("userTokenAccess");
    setUser({});
    setIsLogged(false);
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
