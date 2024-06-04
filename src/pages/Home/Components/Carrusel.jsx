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
    console.log(infoImages[currentIndex].url)
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
            <div className="absolute max-sm:right-5 xl:bottom-[50px] max-xl:bottom-[22px] 2xl:right-10 max-xl:right-[20%] flex justify-around">
                <Timer key={currentIndex} Event_date = {new Date(infoImages[currentIndex].dateTimer)}/>
            </div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden group-hover:z-10">
                <div className="absolute top-[-50%] left-[-1200px] text-white text-shadow-black select-none font-acumin rounded-full h-[1900px] w-[1900px] overflow-hidden bg-primary-yellow max-xl:h-full max-xl:w-full max-xl:top-[-65%] max-xl:left-[-30%]">
                </div>
            </div>
            <div className="absolute top-[40%] left-[5%] text-primary-dark-green text-shadow-black select-none font-acumin group-hover:z-20 flex flex-col gap-5 max-xl:top-10 max-xl:left-10 max-lg:text-center">
                <p className="text-7xl font-acumin font-bold max-sm:text-2xl max-xl:text-3xl">{infoImages[currentIndex].title}</p>
                <p className="text-[3vh] font-acumin font-normal ">{infoImages[currentIndex].date}</p>
                <p className="text-[3vh] font-acumin font-normal ">{infoImages[currentIndex].place}</p>
                <p className="text-[3vh] font-acumin font-normal ">{infoImages[currentIndex].uni}</p>
                <div className={`${infoImages[currentIndex].linkform ? 'block':'hidden'}`}>
                <button className="text-white text-5xl max-sm:text-2xl max-sm:w-32 bg-primary-dark-green select-none rounded-3xl py-3 text-center w-2/3 font-acumin font-medium"
                onClick={() => window.open(infoImages[currentIndex].linkform, '_blank')}
                >Registro</button>
            </div>
            </div>
        </div>
    );
}
