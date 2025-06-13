import { useContext } from 'react';
import { ProductDataContext } from '../../App.jsx'

export default function Carousel({children}) {
  return (
    <section className="w-full h-37.5 md:h-36.25 lg:w-56 lg:h-55.5 relative">
      {children}
    </section>
  )
}

Carousel.ControlButton = function CarouselControlButton({iconUrl, role, onClick}) {
  const position = role === 'prev' ? 'left-2' : role === 'next' ? 'right-2' : '';
  return (
    <button
      className={
        `h-5 w-5 rounded-full flex justify-center items-center absolute z-100 top-1/2 -translate-y-1/2 bg-white 
        ${position}`
      }
      onClick={onClick}
    >
      <img src={iconUrl} alt=""/>
    </button>
  )
}

Carousel.Slides = function CarouselSlides({slideIndex}) {
  const data = useContext(ProductDataContext);
  const images = data.productImages;
  return (
    <div className="h-full w-full flex overflow-hidden">
      {images.map((image, index) => (
        <img
          src={image.src}
          alt={image.alt}
          key={index}
          className="h-full w-full object-cover sm:rounded-[15px] grow-0 shrink-0 transition-translate duration-300 ease-in-out"
          style={{translate: `${-100 * slideIndex}%`}}
        />
      ))}
    </div>
  )
}