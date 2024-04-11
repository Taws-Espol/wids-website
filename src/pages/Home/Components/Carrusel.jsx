import React from "react";
import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { infoImages } from '../../../data/info-Carrusel.js';
import { Timer } from "./Timer.jsx";
import '../../../index.css'; // Asegúrate de que el path sea correcto.

export function Carrusel() {

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
    return (
        <div className='m-0 h-[1000px] w-full py-2 relative group'>
            <div
                style={{ backgroundImage: `url(${infoImages[currentIndex].url})` }}
                className='w-full h-full bg-center bg-cover duration-500'
            ></div>
            <div className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={previousImage} size={30} />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextImage} size={30} />
            </div>
            <div className="absolute bottom-[12%] max-lg:bottom-[22%] left-1/2 transform -translate-x-1/2 translate-y-1/2 flex justify-around">
                <Timer Event_date = {new Date('July 13, 2024 00:00:00')}/>
            </div>
            <div className="absolute top-[10%] left-[5%] text-white select-none">
                <p className="text-4xl font-acumin font-bold">{infoImages[currentIndex].title}</p>
                <p className="text-lg font-acumin font-normal">{infoImages[currentIndex].date}</p>
                <p className="text-lg font-acumin font-normal">{infoImages[currentIndex].place}</p>
            </div>
            <div className="absolute right-[5%] bottom-[9%] max-sm:left-[52%] max-md:left-[57%]  max-lg:left-[60%] max-lg:transform max-lg:-translate-x-1/2 max-lg:translate-y-1/2 ">
                <button className="text-white bg-blue-wids rounded-md px-10 py-3 text-center text-xl font-acumin font-medium">Register</button>
            </div>

        </div>
    );
}
