import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, CardMedia, Typography } from "@mui/material";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FavoritesContext } from "../../../context/FavoritesContext.jsx";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { RotatingTriangles } from  'react-loader-spinner'
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { menuNavigate } from "../../../router/menuNavigate";
import Slider from './Slider.jsx'
import headBrandsMock from './headBrands-mock.json'
import axios from 'axios'
import CustomPagination from "./Pagination.jsx";

const ItemListContainer = () => {

  const [products, setProducts] = useState([]);
  const { favorites, addToFavorites } = useContext(FavoritesContext);
  const [productsRef, setProductsRef] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  
  const location = useLocation();
  const path = location.pathname;
  const params = path.split('/');
  const categoryName = params[params.length - 1];
  const [categoryRef, setCategoryRef] = useState(categoryName ? categoryName : 'todos')
  
  useEffect(()=>{
    axios.get('https://naturalicy-back-production.up.railway.app/api/products/withStock')
    .then(res=>{
      setProductsRef(res.data.products);
      categoryRef === 'todos' || !categoryRef
      ? setProducts(res.data.products)
      : setProducts(res.data.products.filter((product) => product.category === categoryRef))
    })
  },[])


  useEffect(() => {
      const path = location.pathname;
      const params = path.split('/');
      const categoryName = params[params.length - 1];

      setCategoryRef(categoryName)
      setCurrentPage(1)
      categoryName === 'todos' || !categoryName
      ? setProducts(productsRef)
      : setProducts(productsRef.filter((product) => product.category === categoryName));
  }, [location]);

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

  if (products.length === 0) {
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
    <div className="products-section-container">
      <ThemeProvider theme={theme}>
        <div className="headBrands-container">
            <Slider space={0} uniqueSlide={true} navigationActive={false} paginationActive={true} categories={headBrandsMock} sliderType={'headBrands'}/>
        </div>
        <div className="itemListContainer">
          <Typography variant="titulo" className="category-title">Categorías</Typography>
          <div className="category-controllers-container">
            <div className="categoriasContainer">
            <Slider space={50} uniqueSlide={false} navigationActive={true} paginationActive={false} categories={menuNavigate} sliderType={'categories'}/>
            </div>
          </div>
      
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
    </div>
  );
};

export default ItemListContainer;