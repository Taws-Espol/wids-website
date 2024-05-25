import Slider from "react-slick"
import "./Carrusel.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import {ediciones} from "../../../../../data/ediciones";
import {ProfileCard} from "../../../../Edicion/Components/ProfileCard";
function Carrusel() {

    const [slidesToShow, setSlidesToShow] = useState(4);


    const updateSlidesToShow = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1280){
            setSlidesToShow(3);
        }

        else if (windowWidth >= 768){
            setSlidesToShow(2);
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
    
	const edicionData = ediciones.find((edicion) => edicion.edicion === '2020');

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
                    {edicionData.conferencistas &&
                                    edicionData.conferencistas.map((conferencista, index) => (
                                        <ProfileCard key={index} conferencista={conferencista} home={true} />
                                    ))
                    }
                </Slider>
            </div>
        </div>
    )
}
export default Carrusel
