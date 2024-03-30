import Slider from "react-slick"
import "./Carrusel.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Carrusel() {

const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
  };

    return (
        <div className="w-3/4 m-auto">
            <div>
                <Slider {...settings} className="mb-20">
                    {datos.map((dato) => {
                        return(
                            <div key={dato.id} className="mb-8">
                                <div className="flex justify-center">
                                    <img className="hover:scale-105 carrusel-img p-2 rounded-xl" style={{width: '65%'}} src={dato.img}/>
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
       img:`src/assets/info-de-conferencia/Carrusel/prueba1.jpeg`
   },
   {
       id:2,
       img:`src/assets/info-de-conferencia/Carrusel/prueba2.jpeg`
   },
   {
       id:3,
       img:`src/assets/info-de-conferencia/Carrusel/prueba3.jpeg`
   },
   {
       id:4,
       img:`src/assets/info-de-conferencia/Carrusel/prueba4.jpeg`
   },
   {
       id:5,
       img:`src/assets/info-de-conferencia/Carrusel/prueba5.jpeg`
   }
];

export default Carrusel
