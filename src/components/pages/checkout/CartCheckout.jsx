import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import axios from "axios";

const CartCheckout = () => {
    const { cart } = useContext(CartContext);
    const [productsOnCart, setProductsOnCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    let productIds = [];

    useEffect(()=>{
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
        cart.map(element=>{
            productIds.push({id:element.productId, quantity:element.productQuantity})
        })
        
        axios.post(url, productIds, fetchOptions)
        .then(res=>{
            if(res.data.products?.length > 0) {
            setProductsOnCart(res.data.products)
            let total = 0;
            res.data.products.map(element=>{
                total += element.quantity * element.price;
            })
            setTotalPrice(total)
            }
        })
        .catch(error=>console.log(error))
      },[]);

    return (
        <div className="cartCheckout">
            <ThemeProvider theme={theme}>
                <TableContainer component={Paper} className="tablecartCheckout">
                    <Table stickyHeader aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Detalle de compra</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsOnCart.map((product) => {
                                return (
                                    <TableRow key={product._id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: "#F8F8F8" }}>
                                        <TableCell component="th" scope="row" align="left" sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <div className="productContainerCartCheckout">
                                                <img src={`https://naturalicy-back-production.up.railway.app/${product.thumbnail[0]}`} alt="Imagen del producto" />
                                            </div>

                                            <div className="detailProductContainerCheckout">
                                                <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>{product.title}</Typography>
                                                <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>{(product.price*product.quantity).toLocaleString('es-AR', {
                                                    style: 'currency',
                                                    currency: 'ARS',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 2,
                                                })}</Typography>
                                                <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>Cantidad: {product.quantity}</Typography>
                                                <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>Precio unitario: <strong>{product.price.toLocaleString('es-AR', {
                                                    style: 'currency',
                                                    currency: 'ARS',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 2,
                                                })}</strong></Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table >
                    <div className="subTotalCartCheckut">
                        <Typography variant="stock" className="subTotal">Total (sin envío) {totalPrice.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                        })}</Typography>
                    </div>
                </TableContainer>
            </ThemeProvider>
        </div>
    );
};

export default CartCheckout;