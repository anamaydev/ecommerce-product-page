import {useContext, useState, useRef, useEffect} from "react";
import Carousel from "./Carousel";
import ProductInfo from "./ProductInfo";
import { ProductDataContext } from '../../App.jsx'
import prevIcon from '../../assets/images/icon-previous.svg'
import nextIcon from '../../assets/images/icon-next.svg'
import closeIcon from '../../assets/images/icon-close.svg'

export default function Main(){
  const [slideIndex, setSlideIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogRef = useRef(null);

  const data = useContext(ProductDataContext);
  const images = data.productImages;

  function setNextSlideIndex(){
    setSlideIndex(prevSlideIndex => prevSlideIndex === images.length-1 ? 0 : prevSlideIndex + 1);
  }

  function setPrevSlideIndex(){
    setSlideIndex(prevSlideIndex => prevSlideIndex === 0 ? images.length - 1 : prevSlideIndex - 1);
  }

  useEffect(() => {
    if(window.innerWidth >= 1024 && isModalOpen){
      dialogRef.current.showModal();
    }else if(window.innerWidth >= 1024 && !isModalOpen){
      dialogRef.current.close();
    }
  },[isModalOpen]);

  return (
    <main>
      <hr className="hidden sm:block sm:mt-4 text-grey-100"/>
      <div className="mt-3 md:mt-6 lg:mt-12 flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-16 lg:items-center lg:px-5.5">
        {/* carousel */}
        <Carousel>
          <div className="relative">
            <Carousel.ControlButton iconUrl={prevIcon} role={'prev'} onClick={setPrevSlideIndex} className={'lg:hidden'}/>
            <button onClick={()=>setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)}>
              <Carousel.Slides slideIndex={slideIndex}/>
            </button>
            <Carousel.ControlButton iconUrl={nextIcon} role={'next'} onClick={setNextSlideIndex} className={'lg:hidden'}/>
          </div>
          <div className="hidden lg:flex gap-4">
            <Carousel.ThumbnailIndicator slideIndex={slideIndex} setSlideIndex={setSlideIndex}/>
          </div>
        </Carousel>

        {/* product info */}
        <ProductInfo>
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
            <div className="flex flex-col gap-2 sm:gap-3">
              <ProductInfo.CompanyName>{data.company}</ProductInfo.CompanyName>
              <ProductInfo.ProductName>{data.productName}</ProductInfo.ProductName>
            </div>
            <ProductInfo.ProductDescription>{data.productDescription}</ProductInfo.ProductDescription>
          </div>
          <ProductInfo.ProductPrice />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 lg:gap-2 ">
            <ProductInfo.Quantity quantity={quantity} setQuantity={setQuantity}/>
            <ProductInfo.AddToCart></ProductInfo.AddToCart>
          </div>
        </ProductInfo>
      </div>

      {/* modal */}
      <dialog ref={dialogRef} className="p-0 backdrop:bg-black/50 w-screen h-screen max-w-none max-h-none bg-transparent">
        <div className="flex justify-center items-center h-full w-full bg-transparent">
          <Carousel>
            <Carousel.CloseButton setIsModalOpen={setIsModalOpen}/>
            <div className="relative">
              <Carousel.ControlButton iconUrl={prevIcon} role={'prev'} onClick={setPrevSlideIndex}/>
              <Carousel.Slides slideIndex={slideIndex}/>
              <Carousel.ControlButton iconUrl={nextIcon} role={'next'} onClick={setNextSlideIndex}/>
            </div>
            <div className="hidden lg:flex gap-4">
              <Carousel.ThumbnailIndicator slideIndex={slideIndex} setSlideIndex={setSlideIndex}/>
            </div>
          </Carousel>
        </div>
      </dialog>

    </main>
  )
}