import { BrowserRouter, useNavigate } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import FavoritesContextComponent from "./context/FavoritesContext";
import AuthContextComponent from "./context/AuthContext";
import { useEffect } from "react";

function App() {

  function validateTokenDate() {
      let userTokenAccess = localStorage.getItem('userTokenAccess');
      if (userTokenAccess) {
          const expirationLoginDate = localStorage.getItem('expirationLoginDate');
          if (expirationLoginDate) {
              const now = new Date().getTime();
              if (now > parseInt(expirationLoginDate)) {
                localStorage.removeItem('userTokenAccess');
                localStorage.removeItem('expirationLoginDate');
                window.location.href = '/';
              }
          }
      }
  }

  useEffect(()=>{
    validateTokenDate()
  }, [])

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
