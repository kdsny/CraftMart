
import React, { useState, useEffect } from 'react';
import { Slide } from '../types';

interface ImageSliderProps {
  slides: Slide[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 5000); // Change slide every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  }

  return (
    <div className="relative h-[100px] md:h-[500px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
              <p className="text-lg md:text-2xl mb-6 drop-shadow-md">{slide.subtitle}</p>
              <button className="bg-craftmart-600 text-white font-bold py-3 px-8 rounded-full hover:bg-craftmart-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
       <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-craftmart-500 shadow-lg' : 'bg-white/50 hover:bg-white/70'}`}></button>
        ))}
       </div>
    </div>
  );
};

export default ImageSlider;
