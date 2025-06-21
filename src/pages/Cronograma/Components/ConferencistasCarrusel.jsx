import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cronograma } from '../../../data/Cronograma';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function ConferencistasCarrusel() {
  const [conferencistas, setConferencistas] = React.useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Función para manejar la navegación a Conferencistas con scroll al inicio
  const handleNavigateToConferencistas = (e) => {
    e.preventDefault();
    navigate('/conferencistas');
    window.scrollTo(0, 0);
  };

  // Extraer conferencistas únicas del cronograma
  React.useEffect(() => {
    const uniqueConferencistas = [];
    const conferencistaNames = new Set();

    // La ruta correcta donde se encuentran las imágenes
    const imagePath = '/assets/Eventos/Ediciones/2024/Images/conferencistas/';

    cronograma.Conferencias.forEach((conf) => {
      if (!conferencistaNames.has(conf.info) && conf.info && conf.image) {
        conferencistaNames.add(conf.info);
        uniqueConferencistas.push({
          name: conf.info,
          title: conf.work || 'Conferencista',
          image: `${imagePath}${conf.imageName || conf.image}`,
        });
      }
    });

    setConferencistas(uniqueConferencistas);
  }, []);

  // Manejo de redimensionamiento
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

  // Si no hay conferencistas, no renderizar nada
  if (conferencistas.length === 0) {
    return null;
  }

  // Componentes de flechas personalizadas
  const CustomPrevArrow = (props) => (
    <div
      {...props}
      className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-3 shadow-md hover:bg-gray-100"
    >
      <FaArrowLeft color="#00412B" size={20} />
    </div>
  );

  const CustomNextArrow = (props) => (
    <div
      {...props}
      className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-3 shadow-md hover:bg-gray-100"
    >
      <FaArrowRight color="#00412B" size={20} />
    </div>
  );

  // Estilo personalizado para envolver la tarjeta
  const cardWrapperStyle = {
    width: '280px',
    overflow: 'visible', // Cambiar de 'hidden' a 'visible' para que la sombra se vea completa
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '0', // Mantener esquinas cuadradas
    margin: '0 auto 15px', // Añadir margen inferior para separar de los dots
    backgroundColor: 'white',
    height: '380px',
    display: 'flex',
    flexDirection: 'column',
  };

  // Estilo para el contenedor de la imagen - asegurando relación 1:1
  const imageContainerStyle = {
    width: '280px',
    height: '280px',
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0, // Evita que se encoja
    backgroundColor: '#f4f4f4', // Color de fondo en caso de que la imagen no cubra todo
  };

  // Estilo para la imagen - garantizando recorte cuadrado
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top', // Prioriza mostrar la parte superior (rostros)
  };

  // Estilo para el contenedor de texto
  const textContainerStyle = {
    padding: '16px',
    height: '100px', // Altura fija para la sección de texto
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Centra verticalmente el contenido
  };

  // Configuración del slider (ajustar el bottom del appendDots)
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
    ],
    dotsClass: 'slick-dots custom-dots',
    appendDots: (dots) => (
      <div
        style={{
          bottom: '-30px', // Aumentado de -30px a -45px para dar más espacio
        }}
      >
        <ul style={{ margin: '0' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className="mt-6"
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: '#00412B',
          borderRadius: '50%',
          opacity: 0.6,
          transition: 'all 0.3s ease',
        }}
      ></div>
    ),
  };

  return (
    <div className="my-16 w-full bg-white py-10">
      <div className="container mx-auto">
        {/* Contenedor principal con márgenes ajustados para alinear con el carrusel */}
        <div className="mx-auto px-4 md:w-[95%] md:px-0 lg:w-[90%] xl:w-[85%]">
          {/* Encabezado con título y botón en disposición de dos columnas */}
          <div className="mb-8 flex flex-col justify-between md:flex-row md:items-start">
            {/* Columna izquierda: título y descripción */}
            <div className="flex flex-col md:max-w-[60%]">
              <h2 className="mb-2 text-4xl font-bold text-[#00412B]">
                Conferencistas
              </h2>
              <p className="text-lg text-gray-800">
                ¡Únete a nosotros este sábado para un día lleno de inspiración y
                conocimiento en las conferencias de WIDS en ESPOL!
              </p>
            </div>

            {/* Columna derecha: botón (solo visible en escritorio) */}
            <div className="mt-4 hidden md:mt-0 md:block">
              <button
                onClick={handleNavigateToConferencistas}
                className="rounded-full bg-[#EF7B45] px-8 py-3 font-medium text-white transition-colors hover:bg-[#d86a37]"
              >
                Conoce más de ellas
              </button>
            </div>
          </div>

          <div className="relative mt-8">
            {/* Carrusel con react-slick */}
            <Slider ref={sliderRef} {...settings}>
              {conferencistas.map((conferencista, index) => (
                <div key={index} className="px-3">
                  <div style={cardWrapperStyle}>
                    <div style={imageContainerStyle}>
                      <img
                        src={conferencista.image}
                        alt={conferencista.name}
                        style={imageStyle}
                      />
                    </div>
                    <div style={textContainerStyle}>
                      <h3 className="text-center text-xl font-semibold text-green-700">
                        {conferencista.name}
                      </h3>
                      <p className="text-center text-sm text-green-600">
                        {conferencista.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Botón en versión móvil - centrado */}
          <div className="mt-16 flex justify-center md:hidden">
            <button
              onClick={handleNavigateToConferencistas}
              className="rounded-full bg-[#EF7B45] px-8 py-3 font-medium text-white transition-colors hover:bg-[#d86a37]"
            >
              Conoce más de ellas
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-dots .slick-active div {
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}

export default ConferencistasCarrusel;
