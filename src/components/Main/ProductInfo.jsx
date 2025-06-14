import {useContext} from "react";
import { ProductDataContext } from "../../App.jsx";
import plusIcon from '../../assets/images/icon-plus.svg'
import minusIcon from '../../assets/images/icon-minus.svg'

export default function ProductInfo({children}) {
  return(
    <section className="w-full flex flex-col gap-4 sm:gap-3 lg:gap-4 px-3 sm:px-0">
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
    <div className="flex justify-between sm:flex-col sm:gap-1">
      <div className="flex gap-2 sm:gap-3 lg:gap-2 items-start">
        <p className="text-preset-2-bold text-grey-950">${data.discountedPrice}</p>
        <p className="text-preset-3-bold text-white bg-grey-950 rounded-md px-1.25">{data.discount}%</p>
      </div>
      <p className="text-preset-3-bold text-grey-500 line-through">${data.price}</p>
    </div>
  )
}

ProductInfo.Quantity = function ProductInfoQuantity({quantity, setQuantity}) {
  return (
    <div className="p-2 rounded-[10px] bg-grey-50 flex justify-between flex-1">
      <button className="cursor-pointer active:scale-95" onClick={() => setQuantity(prevQuantity => prevQuantity - 1)}><img src={minusIcon} alt=""/></button>
      <p className="text-preset-3-bold text-grey-950">{quantity}</p>
      <button className="cursor-pointer active:scale-95" onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}><img src={plusIcon} alt=""/></button>
    </div>
  )
}

ProductInfo.AddToCart = function ProductInfoAddToCart(){
  return(
    <button className="p-2 flex justify-center gap-2 bg-orange-500 rounded-[10px] flex-1 cursor-pointer active:scale-95">
      <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#1d2025" fillRule="nonzero"/>
      </svg>
      <p className="text-preset-3-bold text-grey-950 whitespace-nowrap">Add to cart</p>
    </button>
  )
}