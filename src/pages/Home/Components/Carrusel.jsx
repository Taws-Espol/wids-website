import React from "react";
import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { infoImages } from './info-Carrusel.js';
import { Timer } from "./Cuadro.jsx";
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

    const goImage = (goalIndex) => {
        setCurrentIndex(goalIndex);
    };



    // Second div left
    // Third div right 
    return (
        <div className='m-0 h-[722px] w-full py-2 relative group'>
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
            <div className="absolute bottom-[12%] left-1/2 transform -translate-x-1/2 translate-y-1/2 flex justify-around">
                <Timer Event_date = {new Date('July 13, 2024 00:00:00')}/>
            </div>
            <div className="absolute top-[10%] left-[5%] text-white">
                <p className="text-4xl font-acumin font-bold">{infoImages[currentIndex].titulo}</p>
                <p className="text-lg font-acumin font-normal">{infoImages[currentIndex].fecha}</p>
                <p className="text-lg font-acumin font-normal">{infoImages[currentIndex].lugar}</p>
            </div>
            <div className="absolute right-[5%] bottom-[5%]">
                <button className="text-white bg-blue-400 rounded-md px-10 py-3 text-center text-xl font-acumin font-medium">Registro</button>
            </div>

        </div>
    );
}
