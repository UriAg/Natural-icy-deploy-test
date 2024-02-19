import { BrowserRouter, useNavigate } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import FavoritesContextComponent from "./context/FavoritesContext";
import AuthContextComponent from "./context/AuthContext";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    function validateTokenDate() {
      let userTokenAccess = localStorage.getItem('userTokenAccess');
      if (userTokenAccess) {
        const expirationLoginDate = localStorage.getItem('expirationLoginDate');
        if (expirationLoginDate) {
          const now = new Date().getTime();
          if (now > parseInt(expirationLoginDate)) {
            localStorage.removeItem('userTokenAccess');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('isLogged');
            localStorage.removeItem('expirationLoginDate');
            window.location.href = '/';
          }
        }
      }
    }

    validateTokenDate();

    const unlisten = window.addEventListener('popstate', validateTokenDate);

    return () => {
      window.removeEventListener('popstate', validateTokenDate);
      unlisten();
    };
  }, []);

  return (
    <BrowserRouter>
      <CartContextComponent>
        <FavoritesContextComponent>
          <AuthContextComponent>
            <AppRouter />
          </AuthContextComponent>
        </FavoritesContextComponent>
      </CartContextComponent>
    </BrowserRouter>
  );
}

export default App;
