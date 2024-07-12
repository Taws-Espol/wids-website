import React from "react";
import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { infoImages } from '../../../data/info-Carrusel.js';
import { Timer } from "./Timer.jsx";
import '../../../index.css'; // Asegúrate de que el path sea correcto.

export default function Carrusel() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const previousImage = () => {
		const isfisrtImage = currentIndex === 0;
		const newIndex = isfisrtImage ? infoImages.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

    const nextImage = () => {
        const isLastImage = currentIndex === infoImages.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    // Second div left
    // Third div right
    const linksForm = ['https://forms.gle/K49hcMVpajuw2QgT6','https://docs.google.com/forms/d/e/1FAIpQLSdhNss5S8yXrnr2nZdPmuNOwk2RZl56Hf8TtMXnpBXBWXECtA/viewform'];
    return (
        <div className='m-0 h-[1000px] w-full relative group'>
            <div
                style={{ backgroundImage: `url(${infoImages[currentIndex].url})` }}
                className='w-full h-full bg-center bg-cover duration-500 bg-opacity-50'
            ></div>
            <div className='hidden group-hover:block  group-hover:z-20 absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={previousImage} size={30} />
            </div>
            <div className='hidden group-hover:block  group-hover:z-20 absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextImage} size={30} />
            </div>
            <div className="xl:absolute place-content-center relative bottom-[20vw] sm:bottom-[17vw] md:bottom-[16vw] xl:bottom-[50px] xl:right-10 flex">
                <Timer key={currentIndex} Event_date = {new Date(infoImages[currentIndex].dateTimer)}/>
            </div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden group-hover:z-10">
                <div className="absolute xl:top-[-50%] xl:left-[-1220px] text-white text-shadow-black select-none font-acumin rounded-full xl:h-[1900px] xl:w-[1900px] overflow-hidden bg-primary-yellow h-full w-full top-[-72%] left-[-35%] xsm:left-[-40%] xsm:top-[-67%] sm:top-[-60%] sm:left-[-45%] md:top-[-57%] lg:top-[-50%] md:left-[-45%]">
                </div>
            </div>
            <div className="absolute top-[35%] left-[5vw] 5xl:left-[3%] text-primary-dark-green text-shadow-black select-none font-acumin group-hover:z-20 flex flex-col max-xl:gap-[1.5vw] gap-4 max-xl:top-10 max-xl:left-15">
                <p className="text-[7vw] xsm:text-[5vw] sm:text-[vw] xl:text-[3.5em] 2xl:text-[4em] 5xl:text-[4em] font-acumin font-bold">{infoImages[currentIndex].title}</p>
                <p className="text-[4vw] xsm:text-[4vw] sm:text-[3vw] xl:text-[2.5em] 2xl:text-[3em] 5xl:text-[3em] font-acumin font-normal ">{infoImages[currentIndex].date}</p>
                <p className="text-[4vw] xsm:text-[4vw] sm:text-[3vw] xl:text-[2.5em] 2xl:text-[3em] 5xl:text-[3em] font-acumin font-normal ">{infoImages[currentIndex].place}</p>
                <p className="text-[4vw] xsm:text-[4vw] sm:text-[3vw] xl:text-[2.5em] 2xl:text-[3em] 5xl:text-[3em] font-acumin font-normal ">{infoImages[currentIndex].uni}</p>
                <div className={`${infoImages[currentIndex].linkform ? 'block':'hidden'}`}>
                <button className="text-white mt-3 text-4xl w-52 lg:text-5xl max-sm:text-2xl max-sm:w-32 bg-primary-dark-green select-none rounded-3xl py-3 text-center lg:w-2/3 font-acumin font-medium"
                onClick={() => window.open(infoImages[currentIndex].linkform, '_blank')}
                >Registro</button>
            </div>
            </div>
        </div>
    );
}
