import { ediciones } from '../../../data/ediciones';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importa los iconos de flecha

export default function CarruselConferences() {

    const year = "2020";

    const edicion2020 = ediciones.find(edicion => edicion.edicion === year);

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
    const path_images = `/assets/Eventos/Ediciones/${year}/Images/conferencistas/`

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
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
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
                <div className="h-[200px] bg-white"></div>
                <div className="h-[100px] bg-primary-dark-green"></div>
            </div>

            <div className="relative w-3/4 m-auto ">

                <h1 className="pt-6 md:pt-10 text-center text-[6vw] md:text-[4vw] 2xl:text-[3vw] min-[2474px]:text-[2.25vw] font-serif font-bold text-white">
                    Conferencistas
                </h1>
                <Slider {...settings}>
                    {edicion2020.conferencistas.map((evento, index) => (
                        <div key={index} >
                            <div className="flex justify-center items-center pt-8 pb-2" >
                                <img src={path_images+evento.imageName} alt={evento.imageName} className="h-44 w-44 rounded-full" />
                            </div>

                            <div className="flex flex-col justify-center items-center pt-2 pb-12">
                                <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}> {evento.name}</p>
                                <p style={{ fontSize: '14px', color: 'grey' }}>{evento.name}</p>
                            </div>

                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}


//  https://react-slick.neostack.com/docs/example/resizable 