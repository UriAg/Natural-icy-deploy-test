import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesContextComponent = ({ children }) => {
  const [favorites, setFavorites] = useState( JSON.parse(localStorage.getItem("favorites")) || []);

  useEffect(()=>{
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (productId) =>{
    let productsOnFavorites = [...favorites];
    const addProduct = {productId};
    const existingProduct = productsOnFavorites.find((el)=>el.productId === addProduct.productId);
    if(existingProduct){
      productsOnFavorites = productsOnFavorites.filter(product=>product.productId !== addProduct.productId)
    }else{
      productsOnFavorites.push(addProduct)
    }
    setFavorites(productsOnFavorites)
  }

  const clearFavorites = ()=>{
    setFavorites( [] )
    localStorage.removeItem("favorites")
  }

  const deleteById = (id)=>{
    const newArr = favorites.filter( elemento => elemento.id !== id)
    localStorage.setItem("favorites", JSON.stringify(newArr))
    setFavorites(newArr)
  }

  const getTotalItems = () => {
    let total = favorites.reduce((acc, elemento) => {
      return acc + elemento.quantity
    }, 0)
    return total
  }

  const getTotalPrice = ()=>{
    const total = favorites.reduce( (acc, elemento)=>{
        return acc + (elemento.unit_price * elemento.quantity)
    }, 0)
    return total
  }

    let data = {
        favorites,
        addToFavorites,
        clearFavorites,
        deleteById,
        getTotalPrice,
        getTotalItems,
    }
  return <FavoritesContext.Provider value={data}>{children}</FavoritesContext.Provider>;
};

export default FavoritesContextComponent;
