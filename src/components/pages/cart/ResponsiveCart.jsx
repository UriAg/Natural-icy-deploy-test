import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import lineCart from "../../../assets/lineCart.png";
import { Icon } from '@iconify/react';
import theme from "../../../temaConfig";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResponsiveCart = ({ products, totalPrice }) => {
    const { addToCart, deleteById } = useContext(CartContext);
    const navigate = useNavigate()
    const onAdd = (product, operation) => {
        if(operation === 'add'){
            if(product.quantity>=product.stock){
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
            }else{
                addToCart(product.id, 1, product.stock);
            }
        }
        if(operation === 'rest'){
            if(product.quantity<=1){
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
            }else{
                addToCart(product.id, -1, product.stock);
            }
        }
    };

    return (
        <div className="cartResponsive">
            {products
            ?<ThemeProvider theme={theme}>
                <Typography variant="h4Custom">Compra/Carrito de compras</Typography>

                <div className="cartStatusResponsive">
                    <Typography variant="titulo" sx={{ fontSize: "0.875rem" }}>Productos</Typography>
                    <div className="separation"></div>
                    <Typography variant="h4" style={{ color: "#164439" }} >Detalle de entrega</Typography>
                    <div className="separation"></div>
                    <Typography variant="h4" style={{ color: "#164439" }} >Medios de pago</Typography>
                </div>

                <TableContainer component={Paper} className="tableContainerResponsive">
                    <Table stickyHeader aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Detalle del producto</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => {
                                return (
                                    <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: "#F8F8F8" }}>
                                        <TableCell component="th" scope="row" align="left" sx={{ display: "flex", justifyContent: "start", alignItems: "center", position:'relative' }}>
                                            <div className="productContainerResponsive">
                                                <img src={`https://naturalicy-back-production.up.railway.app/${product.thumbnail[0]}`} onClick={()=>navigate(`/itemDetail/${product.id}`)} alt="Imagen del producto" />
                                                <div className="deleteProductContainerResponsive">
                                                    <Icon onClick={() => deleteById(product.id)} icon="mdi:garbage" />
                                                </div>
                                            </div>

                                            <div className="detailProductContainerResponsive">
                                                <Typography variant="h4Custom" className="product-title">{product.title}</Typography>

                                                <div className="quantityPriceContainerResponsive">
                                                <div className="quantityContainerResponsive">
                                                    <button type="button" className="quantitySubAddResponsive" disabled={product.quantity <= 1} onClick={()=>onAdd(product, 'rest')}>-</button>
                                                    <Typography variant="h3Counter" className="quantityResponsive">{product.quantity}</Typography>
                                                    <button type="button" className="quantitySubAddResponsive" disabled={product.quantity >= product.stock} onClick={()=>onAdd(product, 'add')}>+</button>
                                                </div>

                                                <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>{(product.quantity * product.price).toLocaleString('es-AR', {
                                                    style: 'currency',
                                                    currency: 'ARS',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 2,
                                                })}</Typography>
                                            </div>

                                            

                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table >
                    <div className="subTotalContainerResponsive">
                        <Typography variant="stock" className="subTotal">Subtotal (sin envío) ${totalPrice}</Typography>
                    </div>
                </TableContainer>
                <div className="optionsContainerResponsive">
                    {products.length > 0 && (
                        <Link to="/shop" className="linksOptionsResponsive">
                            <Icon icon="grommet-icons:next" transform="rotate(180)" />
                            <Typography variant="stock" style={{ color: '#164439' }}>Seguir comprando</Typography>
                        </Link>
                    )}
                    {products.length > 0 && (
                        <Link to="/contactDetail" className="linksOptionsResponsive">
                            <Typography variant="stock" style={{ color: '#164439' }}>Siguiente paso</Typography>
                            <Icon icon="grommet-icons:next" />
                        </Link>
                    )}
                </div>
            </ThemeProvider>
                :
            <ThemeProvider theme={theme}>
                <Typography variant="h2" sx={{ height:'70vh', display:'flex', justifyContent:'center', alignItems:'center'}}>No hay productos en el carrito</Typography>
            </ThemeProvider>
            }
        </div>
    );
};


export default ResponsiveCart;