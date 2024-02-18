import "../footer/Footer.css"
import eneBlanco from "../../../assets/eneBlanco.png"
import naturalBlanco from "../../../assets/naturalBlanco.png"
import theme from "../../../temaConfig";
import { FaInstagram, FaTwitter, FaFacebookSquare } from "react-icons/fa";
import { ThemeProvider } from "@emotion/react";
import { List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const Footer = () => {

    return (
        <ThemeProvider theme={theme}>
        <footer className="pie-pagina">
                <div className="box">
                    <figure>
                            <img src={eneBlanco} style={{ transform: 'rotate(-30deg)', flexShrink: 0, }} alt="Descripción de la imagen" />
                    </figure>
                </div>
            <div className="grupo-1 container">
                <div className="logo">
                        <img src={naturalBlanco} style={{ width: '9rem', height: '1.5rem', flexShrink: 0 }} alt="Descripción de la imagen" />
                    <Typography variant="h6">Comida saludable congelada</Typography>
                </div>
                <div className="secciones">
                    <Typography variant="h4">Secciones</Typography>
                    <List className="itemsContainer">
                        <ListItem className="itemBox">
                            <Link component={Link} to={"/"}>
                                <Typography variant="h5" className="item">Home</Typography>
                            </Link>
                        </ListItem>
                        <ListItem className="itemBox">
                            <Link component={Link} to={"/shop"}>
                                <Typography variant="h5" className="item">Productos</Typography>
                            </Link>
                        </ListItem>
                        <ListItem className="itemBox">
                            <Link component={Link} to={"/cart"}>
                                <Typography variant="h5" className="item">Carrito</Typography>
                            </Link>
                        </ListItem>
                        <ListItem className="itemBox">
                            <Link component={Link} to={"/favorites"}>
                                <Typography variant="h5" className="item">Favoritos</Typography>
                            </Link>
                        </ListItem>
                    </List>
                </div>
                <div className="soporte">
                    <Typography variant="h4">Ayuda y soporte</Typography>
                    <List className="itemsContainer">
                        <ListItem className="itemBox">
                            <Link component={Link} to={""}>
                                <Typography variant="h5" className="item">Contactanos</Typography>
                            </Link>
                        </ListItem>
                        <ListItem className="itemBox">
                            <Link component={Link} to={""}>
                                <Typography variant="h5" className="item">Opciones de entrega</Typography>
                            </Link>
                        </ListItem>
                        <ListItem className="itemBox">
                            <Link component={Link} to={""}>
                                <Typography variant="h5" className="item">Términos y condiciones</Typography>
                            </Link>
                        </ListItem>
                        <ListItem className="itemBox">
                            <Link component={Link} to={""}>
                                <Typography variant="h5" className="item">Quienes somos</Typography>
                            </Link>
                        </ListItem>
                    </List>
                </div>
                <div className="redes" style={{textAlign:'center'}}>
                    <Typography variant="h4">Seguinos en nuestras redes</Typography>
                    <div className="red-social" style={{display:'flex', justifyContent:'space-around', marginTop:'.4em'}}>
                        <a href="https://www.instagram.com/natural.icy.market/" className="fa fa-instagram"><FaInstagram style={{color:'#FFF', width:'1.7em', height:'1.7em'}}/></a>
                        <a href="#" className="fa fa-twitter"> <FaTwitter style={{color:'#FFF', width:'1.7em', height:'1.7em'}}/></a>
                        <a href="#" className="fa fa-facebook"><FaFacebookSquare style={{color:'#FFF', width:'1.7em', height:'1.7em'}}/></a>
                    </div>
                </div>
                <div className="equipo">
                        <Typography variant="h5">&copy; 2023 <b>Equipo CH</b> - Todos los derechos reservados.</Typography>
                </div>
            </div>
        </footer>
        </ThemeProvider>
    );
}

export default Footer;