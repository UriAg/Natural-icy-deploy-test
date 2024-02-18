import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, CardMedia, Typography } from "@mui/material";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FavoritesContext } from "../../../context/FavoritesContext.jsx";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import Slider from '../itemList/Slider.jsx'
import headBrandsMock from '../itemList/headBrands-mock.json'
import axios from 'axios'
import CustomPagination from "../itemList/Pagination.jsx";

const Favorites = () => {

  const [products, setProducts] = useState([]);
  const { favorites, addToFavorites } = useContext(FavoritesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [favoritesContentState, setFavoritesContentState] = useState(null);
  
  let userTokenAccess = localStorage.getItem('userTokenAccess');

  useEffect(()=>{
        const url = 'https://naturalicy-back-production.up.railway.app/api/products/selected';

        let fetchOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (userTokenAccess) {
            fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
        }

        let productsArray = []
        favorites.map(element=>{
            productsArray.push({id:element.productId})
        })

        axios.post(url, productsArray, fetchOptions)
        .then(res=>{
          if(res.data.products?.length > 0) {
            setProducts(res.data.products)
            setFavoritesContentState(true)
          }
        })
        .catch(error=>console.log(error))
      }, [])

  const itemsPerPage = 10;
  
  const loadCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const itemsToLoad = products.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(itemsToLoad);
  };

  useEffect(() => {
    loadCurrentItems();
  }, [currentPage, products]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleFavorites = (option, id) =>{
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

  return (
    <div className="products-section-container">
      {favoritesContentState
      ?<ThemeProvider theme={theme}>
      <div className="itemListContainer">
        <Typography variant="h2" sx={{ display:'block', fontSize:'1.5em', width:'100%', textAlign:'center', paddingBottom:'1.5em' }}>Tus productos favoritos</Typography>
        <div className="itemsFilterContainer">
          <div className="itemsContainer">
            <div className="itemContainer">
              {currentItems.map((product) => (
                <div key={product._id} className="cardContainer">
                  {!favorites.find(e=>e.productId===product._id)
                    ?<MdFavoriteBorder className={`heart-icon heart-icon-add${product._id}`} onClick={()=>handleFavorites(`heart-icon-add${product._id}`, product._id)}/>
                    :<MdFavorite className={`heart-icon heart-icon-remove${product._id}`} onClick={()=>handleFavorites(`heart-icon-remove${product._id}`, product._id)}/>
                  }
                  <CardMedia component="img" src={`https://naturalicy-back-production.up.railway.app/${product.thumbnail[0]}`} alt="Imagen del producto"/>
                  <Typography variant="h4Custom" sx={{ display: 'block', mb: 1 }}>{product.title} </Typography>
                  <Typography variant="h2Custom" sx={{ display: 'block' }}>
                    {product.price.toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                  <div className="butonDetailContainer">
                    <Link to={`/itemDetail/${product._id}`}>
                      <Button variant="contained" disableRipple className="buttonToDetail"><Typography variant="detalle">Ver detalle</Typography>
                        <Box m={0.3} /><Icon icon="fontisto:shopping-basket" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <CustomPagination
                totalItems={products.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      
      </div>
    </ThemeProvider>
    :
    <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{ height:'70vh', display:'flex', justifyContent:'center', alignItems:'center'}}>No hay productos en favoritos</Typography>
    </ThemeProvider>
    }
    </div>
  );
};

export default Favorites;