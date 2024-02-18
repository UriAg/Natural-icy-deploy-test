import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../../temaConfig";
import { useContext, useEffect } from "react";
import { CartContext } from "../../../context/CartContext";

const ShipmentSuccess = () => {
  const { clearCart } = useContext(CartContext)
  useEffect(()=>{
    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
    clearCart();
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        
        <Typography variant="h2" sx={{
          height:'70vh',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          marginBottom:'1.5em',
          position:'relative',
          textAlign:'center'
          }}>
            <img src="https://cdn-icons-png.flaticon.com/512/5290/5290071.png" style={{ width:'30%', margin:'1.5em 0'}} alt="Imagen de confirmación de pago" />
            ¡El pago se aceptó y la compra fue realizada! :) <br />
            En instantes seras redireccionado al inicio.
        </Typography>
        <div style={{width:'100%', textAlign:'center', padding:'1em 0'}}>
        <span style={{fontWeight:'bolder'}}>Recuerda que te enviamos un correo con la orden de compra</span>

        </div>
      </ThemeProvider>
    </>
  );
};

export default ShipmentSuccess;
