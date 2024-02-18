import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import FavoritesContextComponent from "./context/FavoritesContext";
import AuthContextComponent from "./context/AuthContext";

function App() {
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
