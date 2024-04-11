import Slider from "react-slick"
import "./Carrusel.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

function Carrusel() {

    const [slidesToShow, setSlidesToShow] = useState(4);


    const updateSlidesToShow = () => {
        const windowWidth = window.innerWidth;
        console.log(windowWidth)
        if (windowWidth >= 1280){
            setSlidesToShow(4);
        }

        else if (windowWidth >= 768){
            setSlidesToShow(3);
        }

        else {
            setSlidesToShow(1);
        }
    }

    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        }
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
    };

    return (
        <div className="w-3/4 m-auto">
            <div className="mt-[5vw] mb-[5vw]">
                <Slider {...settings}>
                    {datos.map((dato) => {
                        return(
                            <div key={dato.id} className="">
                                <div className="flex justify-center">
                                    <img className="hover:scale-105 carrusel-img p-2 rounded-xl w-[65%] md:w-[85%] " src={dato.img}/>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

//datos temporales
const datos = [
   {
       id:1,
       img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
   },
   {
       id:2,
       img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
   },
   {
       id:3,
       img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
   },
   {
       id:4,
       img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
   },
   {
       id:5,
       img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
   }
];

export default Carrusel
