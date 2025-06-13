import Carousel from "./Carousel";
import { ProductDataContext } from '../../App.jsx'

import prevIcon from '../../assets/images/icon-previous.svg'
import nextIcon from '../../assets/images/icon-next.svg'
import {useContext, useState} from "react";

export default function Main(){
  const data = useContext(ProductDataContext);
  const images = data.productImages;

  const [slideIndex, setSlideIndex] = useState(0);

  function setNextSlideIndex(){
    setSlideIndex(prevSlideIndex => prevSlideIndex === images.length-1 ? 0 : prevSlideIndex + 1);
  }

  function setPrevSlideIndex(){
    setSlideIndex(prevSlideIndex => prevSlideIndex === 0 ? images.length - 1 : prevSlideIndex - 1);
  }

  return (
    <main>
      <hr className="hidden sm:block sm:mt-4 text-grey-100"/>
      <div className="mt-3 md:mt-6 lg:mt-12">
        {/* carousel */}
        <Carousel>
          <Carousel.ControlButton iconUrl={prevIcon} role={'prev'} onClick={setPrevSlideIndex}/>
          <Carousel.Slides slideIndex={slideIndex}/>
          <Carousel.ControlButton iconUrl={nextIcon} role={'next'} onClick={setNextSlideIndex}/>
        </Carousel>

        {/* product info */}
      </div>
    </main>
  )
}