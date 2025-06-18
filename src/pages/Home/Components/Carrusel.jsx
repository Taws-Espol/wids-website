import Slider from 'react-slick';
import { infoImages } from '../../../data/info-Carrusel.js';
import { Timer } from './Timer.jsx';
import '../../../index.css';

export default function Carrusel() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 500,
    cssEase: 'linear',
    arrows: false,
  };

  return (
    <>
      <Slider {...settings} className="h-[500px] w-full">
        {infoImages.map(
          ({ url, color, title, uni, place, date, dateTimer }, index) => {
            return (
              <div key={index} className="h-[500px]">
                <div
                  style={{ backgroundImage: `url(${url})` }}
                  className="flex h-[500px] w-full flex-col-reverse bg-cover bg-center bg-no-repeat lg:flex-row-reverse"
                >
                  <div
                    className={`align-center flex flex-col content-center justify-center gap-2 text-center text-primary-dark-green bg-primary-${color} h-[35%] w-full pb-10 lg:h-full lg:w-[30%] lg:pb-0 lg:pr-10`}
                  >
                    <h3 className="text-3xl font-bold">{title}</h3>
                    <div>
                      <p>{date}</p>
                      <p>
                        {uni}, {place}
                      </p>
                    </div>
                    <button className="mx-auto w-2/3 max-w-[250px] rounded-full rounded-lg bg-primary-dark-green px-4 py-2 text-white">
                      Más información
                    </button>
                  </div>
                  <div
                    className={`bg-primary-${color} h-[10%] w-full rounded-t-full lg:h-full lg:w-[10%] lg:rounded-l-full lg:rounded-r-[0px]`}
                  ></div>
                  <Timer key={index} Event_date={new Date(dateTimer)} />
                </div>
              </div>
            );
          },
        )}
      </Slider>
    </>
  );
}
