import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState( JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  const addToCart = (productId, productQuantity, productStock) =>{
    const addProduct = {productId, productQuantity};
    const productsAOnCart = [...cart];
    const existingProduct = productsAOnCart.find((el)=>el.productId === addProduct.productId);
    // console.log(productQuantity)
    if(existingProduct){

    (existingProduct.productQuantity + parseInt(productQuantity, 10)) >= parseInt(productStock, 10) ?
    existingProduct.productQuantity = parseInt(productStock, 10) :
    existingProduct.productQuantity += parseInt(productQuantity, 10)
    }else{
      productsAOnCart.push(addProduct);
    }
    console.log(productsAOnCart)
    setCart(productsAOnCart);
  }

  const getQuantityById = (id)=>{
    let product = cart.find( elemento => elemento.productId === id)
    return product?.productQuantity
  }

  const deleteById = (id)=>{
    const newArr = cart.filter( elemento => elemento.productId !== id)
    if(!newArr.length){
      window.location.reload();
      localStorage.removeItem("cart")
    }else{
      localStorage.setItem("cart", JSON.stringify(newArr))
    }
    setCart(newArr)
  }

  // const getTotalItems = () => {
  //   let total = cart.reduce((acc, elemento) => {
  //     return acc + elemento.productQuantity
  //   }, 0)
  //   return total
  // }

  // const getTotalPrice = ()=>{
  //   const total = cart.reduce( (acc, elemento)=>{
  //       return acc + (elemento.unit_price * elemento.quantity)
  //   }, 0)
  //   return total
  // }

  const clearCart = () =>{
    setCart([])
    localStorage.setItem("cart", [])
  }

    let data = {
        cart,
        clearCart,
        addToCart,
        getQuantityById,
        deleteById,
        // getTotalPrice,
        // getTotalItems,
    }
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
