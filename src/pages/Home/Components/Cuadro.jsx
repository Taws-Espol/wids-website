import React, { useEffect } from "react";
import { useState } from "react";
import '../../../index.css'; // Asegúrate de que el path sea correcto.



export function Timer({Event_date}) {

    const [rest, setTime] = useState({
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    
    function updateTime(Event_date){
        // Función para actualizar el tiempo restante
        const updateCountdown = () => {
            const actual = new Date();
            const difference = Event_date - actual;

            if (difference <= 0) {
                clearInterval(intervalId);
                setTime({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
                const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 7);
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                // console.log(difference,weeks,days,hours,minutes,seconds);
                setTime({ weeks, days, hours, minutes, seconds });
            }
        };
        const intervalId = setInterval(updateCountdown, 1000);
        return () => clearInterval(intervalId); 
    }
    
    useEffect(()=>{
        updateTime(Event_date);
    });


    function Cuadro(props) {
        return (
            <div className={`text-black h-28 w-28 flex flex-col place-content-center place-items-center text-center font-bold select-none  ${!props.isSec ? 'bg-white' : 'bg-gradient-to-b from-red-400 to-red-900'} max-sm:w-14 max-sm:h-14 max-md:w-16 max-md:h-16 max-xl:w-[90px] max-xl:h-[90px] rounded-full` }>
                <p className="text-4xl max-sm:text-2xl max-lg:text-3xl">
                    {props.time}
                </p>
                <p className="text-xl max-sm:text-[10px] max-md:text-base max-lg:text-lg">
                    {props.timeInfo}
                </p>
            </div>
        )
    }

    return (
        <div className="bg-transparent flex flex-wrap gap-10 max-w-[900px] place-content-between p-1  max-sm:w-[340px] max-sm:gap-3 max-md:w-[500px] max-2xl:w-[800px] max-lg:gap-5" >
            <Cuadro className=""
                time={rest.weeks}
                timeInfo="Weeks"
            />
            <Cuadro className=""
                time={rest.days}
                timeInfo="Days"
            />
            <Cuadro className=""
                time={rest.hours}
                timeInfo="Hr"
            />
            <Cuadro className=""
                time={rest.minutes}
                timeInfo="Min"
            />
            <Cuadro className=""
                time={rest.seconds}
                timeInfo="Sec"
                isSec={true}
            />
        </div>
    )
}