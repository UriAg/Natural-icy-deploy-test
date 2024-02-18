import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Box, Button, CardMedia, Typography, ThemeProvider} from "@mui/material";
import { CartContext } from "../../../context/CartContext.jsx";
import { FavoritesContext } from "../../../context/FavoritesContext.jsx";
import { Icon } from "@iconify/react";
import theme from "../../../temaConfig";
import { styled } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import { RotatingTriangles } from  'react-loader-spinner'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ButtonBuy = styled(Button)({
  boxShadow: "none",
  borderRadius: "2px",
  textTransform: "none",
  width: "16.313rem",
  height: "3.938rem",
  backgroundColor: "#308d72",
  marginLeft: "0.313rem",
  textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
  transition: "all .2s ease",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: "#2c735e",
    textAlign: "center",
    "& svg": {
      color: "#FFF)",
    },
    "& .MuiTypography-root": {
      color: "#FFF",
      // textShadow: '0px 1px 0px rgba(0, 0, 0, 0.25)',
      // fontStyle: 'italic',
      fontFamily: "Hagrid Trial",
      // fontSize: "15px",
    },
  },
});

const Service = ({ icon, title, subtitle }) => (
  <div className="service">
    <Icon icon={icon} />
    <Typography variant="serviceBold" className="serviceBold">
      {title}
    </Typography>
    <Typography variant="service">
      {subtitle}
    </Typography>
  </div>
);

const ItemDetail = () => {
  const { id } = useParams();
  const { cart, addToCart } = useContext(CartContext);
  const { favorites, addToFavorites } = useContext(FavoritesContext);
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(1);
  
  useEffect(() => {
    axios.get(`https://naturalicy-back-production.up.railway.app/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
      });
    window.scrollTo(0, 0);
  }, []);

  let isProductOnFavorites = favorites.find(e=>e.productId===id);
  
  //OCULTAR ICONO DE FAVORITOS
  const handleFavorites = (option) =>{
    const buttons = document.querySelectorAll('.heart-icon');
    buttons.forEach(button => {
      if (button.classList.contains(`${option}`)) {
        button.style.display = 'none';    
      } else {
        button.style.display = 'inline-block';        
      }
    });
    addToFavorites(id)
  }

  // SUMAR
  const addOne = () => {
    setCounter(counter + 1);
  };

  // RESTAR
  const subOne = () => {
    setCounter(counter - 1);
  };

  // AGREGAR AL CARRITO
  const onAdd = () => {
    let productExists = cart.find( e => e.productId === id)
    if(productExists){

      if(productExists.productQuantity >= product.stock){
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
      }else if((productExists.productQuantity+counter)>product.stock){
        let maxNumOfProducts = (product.stock-productExists.productQuantity);
        addToCart(id, maxNumOfProducts, product.stock);
    
        toast.warn(`Solo se agregaron ${maxNumOfProducts} unidades`, {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }else{
        addToCart(id, counter, product.stock);
    
        toast.success("¡Su producto fue agregado con éxito!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }      
    }else{
      addToCart(id, counter, product.stock);
    
      toast.success("¡Su producto fue agregado con éxito!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  
  if (!product) {
    return (
      <div style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        }}>
        <RotatingTriangles
          visible={true}
          ariaLabel="rotating-triangels-loading"
          wrapperClass="rotating-triangels-wrapper"
          colors={['#51E5FF', '#7DE2D1', '#FF7E6B']}
          
        />
      </div>
    );
  }

  return (
    <div className="global-container">
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <div className="globalItemDetailContainer">
          {product && (
            <div className="imgContainer">
              {!isProductOnFavorites
                ?<MdFavoriteBorder className="heart-icon heart-icon-add" onClick={()=>handleFavorites('heart-icon-add')}/>
                :<MdFavorite className="heart-icon heart-icon-remove" onClick={()=>handleFavorites('heart-icon-remove')}/>
              }
              <CardMedia
                component="img"
                id="item-image"
                src={`https://naturalicy-back-production.up.railway.app/${product.thumbnail[0]}`}
                alt="Imagen del producto seleccionado"
              />
            </div>
          )}
          <div className="item-container">
            {product && (
              <div className="itemDetail">
                <div
                  className="label-container"
                >
                  {product.labels.map((label) => (
                    <span
                      key={label}
                      style={{
                        display: "inline",
                        backgroundColor: "#41a88a",
                        width: "fit-content",
                        color: "#FFF",
                        padding: "0 .2em",
                        borderRadius: ".2em",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <Typography variant="h1" className="titleDetail" >
                  {product.title}
                </Typography>
                <Typography
                  variant="h2Description"
                  className="descriptionDetail"
                >
                  {product.description}
                </Typography>
                <Typography variant="h1Custom">
                  {product.price.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </div>
            )}

            <div
              className="stockCounterButtonContainer"
            >
              <div
                className="counter-container"
              >
                <div className="stockItemDetail">
                  {product?.stock === 0 && (
                    <Typography variant="stock"> Sin stock </Typography>
                  )}
                  {product?.stock >= 1 && product?.stock <= 5 && (
                    <Typography variant="stock">Pocas unidades</Typography>
                  )}
                  {product?.stock >= 6 && (
                    <Typography variant="stock"> En stock </Typography>
                  )}
                </div>
                <div className="counterItemDetail">
                  <button
                    type="button"
                    className="subRemoveOne"
                    disabled={counter <= 1}
                    onClick={subOne}
                  >
                    -
                  </button>
                  <Typography variant="h3Counter">{counter}</Typography>
                  <button
                    type="button"
                    className="subAddOne"
                    disabled={counter >= product?.stock}
                    onClick={addOne}
                  >
                    +
                  </button>
                </div>
              </div>
                <ButtonBuy
                  variant="contained"
                  disableRipple
                  onClick={onAdd}
                  className="buttonDetail"
                >
                  <Typography variant="h4">Agregar al carrito</Typography>
                  <Box m={0.3} />
                  <Icon icon="fontisto:shopping-basket" />
                </ButtonBuy>
            </div>
          </div>
        </div>

        <div className="serviceContainer">
          <Service
            icon="ic:baseline-delivery-dining"
            title="Envíos"
            subtitle="Express"
          />
          <Service
            icon="material-symbols:store"
            title="Productos"
            subtitle="Seleccionados"
          />
          <Service
            icon="ic:twotone-support-agent"
            title="Atención"
            subtitle="Personalizada"
          />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ItemDetail;
