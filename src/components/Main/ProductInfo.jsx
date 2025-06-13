import {useContext} from "react";
import { ProductDataContext } from "../../App.jsx";
export default function ProductInfo({children}) {
  return(
    <section className="w-full flex flex-col gap-4">
      {children}
    </section>
  )
}

ProductInfo.CompanyName = function ProductInfoCompanyName({children}){
  return (
    <h2 className="text-preset-5-bold text-grey-500 uppercase">{children}</h2>
  )
}

ProductInfo.ProductName = function ProductInfoProductName({children}){
  return (
    <h1 className="text-preset-2-bold sm:text-preset-1-bold text-grey-950">{children}</h1>
  )
}

ProductInfo.ProductDescription = function ProductInfoProductDescription({children}){
  return(
    <p className="text-preset-4 sm:text-preset-3 text-grey-500">{children}</p>
  )
}

ProductInfo.ProductPrice = function ProductInfoProductPrice(){
  const data = useContext(ProductDataContext);

  return (
    // outer div
    <div>
      {/* inner div */}
      <div>
        <p>{data.discountedPrice}</p>
        <p>{data.discount}</p>
      </div>

      <p>{data.price}</p>
    </div>
  )
}
