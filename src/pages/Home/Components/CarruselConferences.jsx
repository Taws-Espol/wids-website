import { ediciones } from '../../../data/ediciones';
import React, { useRef, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importa los iconos de flecha

export default function CarruselConferences() {
    const year = "2024";
    const edicion2024 = ediciones.find(edicion => edicion.edicion === year);

    const sliderRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (sliderRef.current) {
                sliderRef.current.slickGoTo(sliderRef.current.innerSlider.state.currentSlide);
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
    const conferencistas = edicion2024.conferencistas.filter(edicion => edicion.name != "");

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
                    dots: true
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="relative h-[500px]">
            <div className="absolute inset-0">
                <div className="h-[200px] bg-primary-dark-green"></div>
                <div className="h-[270px] bg-white"></div>
                <div className="h-[100px] bg-primary-dark-green mb-10"></div>
            </div>
            <div className="relative w-3/4 m-auto font-acumin ">
                <h1 className="pt-6 md:pt-10 text-center text-[6vw] md:text-[4vw] 2xl:text-[3vw] min-[2474px]:text-[2.25vw] font-serif font-bold text-white">
                    CONFERENCISTAS
                </h1>
                <Slider ref={sliderRef} {...settings}>
                    {conferencistas.map((evento, index) => (
                        <div key={index} >
                            <div className="flex justify-center items-center pt-8 pb-2" >
                                <img src={path_images + evento.imageName} alt={evento.imageName} className="h-60 w-60 object-contain rounded-full" />
                            </div>
                            <div className="text-center overflow-hidden whitespace-normal break-words flex flex-col justify-center items-center pt-2 pb-12">
                                <p style={{ fontSize: '25px', fontWeight: 'bold', color: 'black' }}>{evento.name}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}



//  https://react-slick.neostack.com/docs/example/resizable 
