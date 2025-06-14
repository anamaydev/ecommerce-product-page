import { useContext } from 'react';
import { ProductDataContext } from '../../App.jsx'

export default function Carousel({children}) {
  return (
    <section className="w-full lg:w-56 flex flex-col gap-4 relative">
      {children}
    </section>
  )
}

Carousel.ControlButton = function CarouselControlButton({iconUrl, role, onClick, className}) {
  const position = role === 'prev' ? 'left-2 lg:left-0 lg:-translate-x-1/2' : role === 'next' ? 'right-2 lg:-right-0 lg:translate-x-1/2' : '';
  return (
    <button
      className={`h-5 w-5 rounded-full flex justify-center items-center absolute z-100 top-1/2 -translate-y-1/2 bg-white cursor-pointer active:scale-95 ${position} ${className}`}
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
    <div className="w-full h-37.5 md:h-36.25 lg:h-55.5 sm:rounded-[15px] flex overflow-hidden">
      {
        images.map((image, index) => (
          <img
            src={image.src}
            alt={image.alt}
            key={index}
            className="h-full w-full object-cover sm:rounded-[15px] grow-0 shrink-0 transition-translate duration-500 ease-in-out"
            style={{translate: `${-100 * slideIndex}%`}}
          />
      ))}
    </div>
  )
}

Carousel.ThumbnailIndicator = function CarouselThumbnailIndicator({slideIndex, setSlideIndex}) {
  const data = useContext(ProductDataContext);
  const images = data.productImages;

  return(
    images.map((image, index) => (
      <button
        className={`w-11 h-11 border-2 rounded-[10px] ${index === slideIndex ? 'selectedIndicator' : 'border-transparent'} overflow-hidden relative cursor-pointer active:scale-95`}
        onClick={() => setSlideIndex(index)}
        key={index}
      >
        <img
          src={image.src}
          alt={image.alt}
          key={index}
          className="h-full w-full object-cover"
        />
      </button>
    ))
  )
}

Carousel.CloseButton = function CarouselCloseButton({setIsModalOpen}) {
  return(
    <button className="absolute h-2.5 w-2.5 -top-4 right-0 z-50 cursor-pointer active:scale-95" onClick={()=>setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)}>
      <svg className=" text-white hover:text-orange-500" width="14" height="15" xmlns="http://www.w3.org/2000/svg">
        <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="currentColor" fillRule="evenodd"/>
      </svg>
    </button>
  )
}