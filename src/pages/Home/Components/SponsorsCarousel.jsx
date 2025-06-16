import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SponsorsCarousel.css'; // Import your custom styles if needed

export default function SponsorsCarousel({ sponsors }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
    <div className="my-10 h-1/4">
      <Slider {...settings}>
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="flex h-full w-full items-center justify-center px-4 py-4"
          >
            <img src={sponsor.logo} className="mx-auto h-24 object-contain" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
