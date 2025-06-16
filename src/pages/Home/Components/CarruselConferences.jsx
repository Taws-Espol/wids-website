import { ediciones } from '../../../data/ediciones';
import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importa los iconos de flecha

export default function CarruselConferences() {
  const year = '2024';
  const edicion2024 = ediciones.find((edicion) => edicion.edicion === year);

  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(
          sliderRef.current.innerSlider.state.currentSlide,
        );
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const CustomPrevArrow = (props) => (
    <div {...props}>
      <FaArrowLeft color="black" size={20} />
    </div>
  );

  const CustomNextArrow = (props) => (
    <div {...props}>
      <FaArrowRight color="black" size={20} />
    </div>
  );

  const path_images = `/assets/Eventos/Ediciones/${year}/Images/conferencistas/`;
  const conferencistas = edicion2024.conferencistas.filter(
    (edicion) => edicion.name != '',
  );

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    nextArrow: <CustomNextArrow />, // Usa las flechas personalizadas
    prevArrow: <CustomPrevArrow />, // Usa las flechas personalizadas
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative h-[500px]">
      <div className="absolute inset-0">
        <div className="h-[200px] bg-primary-dark-green"></div>
        <div className="h-[280px] bg-white"></div>
        <div className="mb-10 h-[100px] bg-primary-dark-green"></div>
      </div>
      <div className="font-acumin relative m-auto w-3/4">
        <h1 className="pt-6 text-center font-serif text-[6vw] font-bold text-white md:pt-10 md:text-[4vw] 2xl:text-[3vw] min-[2474px]:text-[2.25vw]">
          CONFERENCISTAS
        </h1>
        <Slider ref={sliderRef} {...settings}>
          {conferencistas.map((evento, index) => (
            <div key={index}>
              <div className="flex items-center justify-center pb-2 pt-8">
                <img
                  src={path_images + evento.imageName}
                  alt={evento.imageName}
                  className="h-60 w-60 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center justify-center overflow-hidden whitespace-normal break-words pb-12 pt-2 text-center">
                <p
                  style={{
                    fontSize: '25px',
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  {evento.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

//  https://react-slick.neostack.com/docs/example/resizable
