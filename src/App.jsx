import { useState, createContext } from "react";
import CustomHeader from './components/Header/CustomHeader.jsx'
import Main from './components/Main/Main'
import { productData } from './data'

export const ProductDataContext = createContext();
export const CartDataContext = createContext();

function App() {
  const [cart, setCart] = useState({});
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
      <CartDataContext.Provider value={{cart, setCart, openCart, setOpenCart}}>
        <CustomHeader/>
      </CartDataContext.Provider>

      <CartDataContext.Provider value={setCart}>
        <ProductDataContext.Provider value={productData}>
          <Main/>
        </ProductDataContext.Provider>
      </CartDataContext.Provider>
    </>
  )
}

export default App

/*
* todo:
*  [ ] add header tag (semantic)
*  [ ] fix prev and next button z-index (it is above the nav bar)
* */