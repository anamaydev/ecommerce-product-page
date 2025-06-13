import { createContext } from "react";
import CustomHeader from './components/Header/CustomHeader.jsx'
import Main from './components/Main/Main'
import { productData } from './data'

export const ProductDataContext = createContext();

function App() {
  return (
    <>
      <CustomHeader/>
      <ProductDataContext.Provider value={productData}>
        <Main/>
      </ProductDataContext.Provider>
    </>
  )
}

export default App