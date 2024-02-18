import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import lineCart from "../../../assets/lineCart.png"
import { Icon } from '@iconify/react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import ResponsiveCart from "./ResponsiveCart";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, addToCart, deleteById } = useContext(CartContext);
  const [productsOnCart, setProductsOnCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate();

  let productIds = [];

  useEffect(() => {
    let userTokenAccess = localStorage.getItem('userTokenAccess');
    const url = 'https://naturalicy-back-production.up.railway.app/api/carts/selected';

    let fetchOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (userTokenAccess) {
      fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
    }
    cart.map(element => {
      productIds.push({ id: element.productId, quantity: element.productQuantity })
    })

    axios.post(url, productIds, fetchOptions)
      .then(res => {
        if (res.data.products?.length > 0) {
          setProductsOnCart(res.data.products)
          let total = 0;
          res.data.products.map(element => {
            total += element.quantity * element.price;
          })
          setTotalPrice(total)
        }
      })
      .catch(error => console.log(error))
  }, [cart]);

  const onAdd = (product, operation) => {
    if (operation === 'add') {
      if (product.quantity >= product.stock) {
        if (product.quantity >= product.stock) {
          toast.error(`Se alcanzó el numero máximo de stock`, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return
        }
      } else {
        addToCart(product.id, 1, product.stock);
      }
    }
    if (operation === 'rest') {
      if (product.quantity <= 1) {
        toast.error(`Se alcanzó la cantidad de unidades mínima`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return
      } else {
        addToCart(product.id, -1, product.stock);
      }
    }
  };

  if (!productsOnCart || !productsOnCart.length) {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No hay productos en el carrito</Typography>
      </ThemeProvider>
    )
  }

  return (
    <div>
      {productsOnCart.length > 0
        ? <ThemeProvider theme={theme}>
          <ToastContainer />
          <div className="cart">
            <Typography variant="h4Custom">Compra/Carrito de compras</Typography>

            <div className="cartStatus">
              <Typography variant="titulo" sx={{ fontSize: "0.875rem" }}>Productos</Typography>
              <div className="separation"></div>
              <Typography variant="h4" style={{ color: "#164439" }} >Detalle de entrega</Typography>
              <div className="separation"></div>
              <Typography variant="h4" style={{ color: "#164439" }} >Medios de pago</Typography>
            </div>

            <TableContainer component={Paper} className="tableContainer">
              <Table stickyHeader aria-label="simple table">
                <TableHead >
                  <TableRow >
                    <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Imagen</Typography></TableCell>
                    <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Producto</Typography></TableCell>
                    <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Cantidad</Typography></TableCell>
                    <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Precio</Typography></TableCell>
                    <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Subtotal</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productsOnCart.map((product) => {
                    return (
                      <TableRow key={product.id} className="table-product-container" sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: "#F8F8F8" }}>
                        <TableCell component="th" scope="row" align="left" sx={{ display: "flex" }}>
                          <div className="productContainer">
                            <img src={`https://naturalicy-back-production.up.railway.app/${product.thumbnail[0]}`} onClick={() => navigate(`/itemDetail/${product.id}`)} alt="Imagen del producto" />
                            <div className="deleteProductContainer">
                              <Icon onClick={() => deleteById(product.id)} icon="mdi:garbage" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          <div className="titleProductContainer" style={{ width: '15em' }}>
                            <Typography variant="h4Custom" sx={{ fontSize: "0.813rem", whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', display: 'block' }}>{product.title}</Typography>
                          </div>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          <div className="quantityContainer">
                            <button type="button" className="quantitySubAdd" disabled={product.quantity <= 1} onClick={() => onAdd(product, 'rest')}>-</button>
                            <Typography variant="h3Counter" className="quantity">{product.quantity}</Typography>
                            <button type="button" className="quantitySubAdd" disabled={product.quantity >= product.stock} onClick={() => onAdd(product, 'add')}>+</button>
                          </div>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          <Typography variant="h4Custom" sx={{ lineHeight: "112%" }}>{product.price.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          <Typography variant="h4Custom" sx={{ lineHeight: "112%" }}>{(product.quantity * product.price).toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table >
              <div className="subTotalContainer">
                <Typography variant="stock" className="subTotal" style={{ backgroundColor: '#F8F8F8' }}>Subtotal (sin envío) {parseFloat(totalPrice).toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
                </Typography>
              </div>
            </TableContainer>
            <div className="optionsContainer">
              {cart.length > 0 && (
                <Link to="/shop" className="linksOptions">
                  <Typography variant="stock" style={{ color: '#164439' }}><Icon icon="grommet-icons:next" transform="rotate(180)" />Seguir comprando</Typography>
                </Link>
              )}
              {cart.length > 0 && (
                <Link to="/contactDetail" className="linksOptions">
                  <Typography variant="stock" style={{ color: '#164439' }}>Siguiente paso <Icon icon="grommet-icons:next" /></Typography>
                </Link>
              )}
            </div>
          </div>
          <div className="responsiveCart">
            <ResponsiveCart products={productsOnCart} totalPrice={totalPrice} />
          </div>

        </ThemeProvider>
        :
        <ThemeProvider theme={theme}>
          <Typography variant="h2" sx={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No hay productos en el carrito</Typography>
        </ThemeProvider>
      }
    </div>
  );
};

export default Cart;