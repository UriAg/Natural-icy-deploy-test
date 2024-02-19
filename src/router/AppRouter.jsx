import { Link, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import RegisterConfirm from "../components/pages/register/RegisterConfirm";
import ForgotPassword from "../components/pages/forgotPassword/ForgotPassword";
import ChangePassword from "../components/pages/forgotPassword/ChangePassword";
import Dashboard from "../components/pages/dashboard/Dashboard";
import ProtectedAdmin from "./ProtectedAdmin";
import Layout from "../components/layout/Layout";
// import Cart from "../components/pages/cart/Cart";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ id, path, Element }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
      </Route>

      

      {/* PARA LOS USUARIOS ADMIN */}
      <Route element={<ProtectedAdmin />} >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* register  */}
      <Route path="/register" element={<Register />} />
      <Route path="/register/confirm" element={<RegisterConfirm />} />

      {/* forgot password  */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/changePassword" element={<ChangePassword />} />

      {/* Nota: Asegúrate de agregar el componente Footer dentro del Route */}
      
      <Route path="*" element={<div style={{
          backgroundColor:'#abb9b2',
          width:'100%',
          height:'100vh',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column',
          color:'#349377',
          filter:'invert(1)'
        }}>
        <h1>404 - Not found</h1>
        <Link to='/' style={{fontSize:'1em', fontFamily:'sans-serif'}}>
          Regresar al sitio
        </Link>
        </div>}
      />

    </Routes>
  );
};
export default AppRouter;
