import { ediciones } from '../../../data/ediciones';

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function CarruselConferences() {

    const edicion2020 = ediciones.find(edicion => edicion.edicion === "2020");

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true, 
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
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
        
        <div className="relative h-[500px]" >
            <div className="absolute inset-0">
                <div className="h-2/6 bg-primary-dark-green"></div>
                <div className="h-3/6 bg-white"></div>
                <div className="h-1/6 bg-primary-dark-green"></div>
            </div>

            <div className="relative w-3/4 m-auto ">

                <h1 className="pt-6 md:pt-10 text-center text-[6vw] md:text-[4vw] 2xl:text-[3vw] min-[2474px]:text-[2.25vw] font-serif font-bold" style={{color:"white"}}>
                    Conferencistas
                </h1>
                <Slider {...settings}>
                    {edicion2020.conferencistas.map((evento, index) => (
                        <div key={index} >
                            <div className="flex justify-center items-center pt-8 pb-2" >
                                <img src={'src/assets/pruebaMaru/' + evento.imageName} alt={evento.title} className="h-44 w-44 rounded-full" />
                            </div>

                            <div className="flex flex-col justify-center items-center pt-2 pb-8">
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