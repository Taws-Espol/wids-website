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

    function CardTimer(props) {

        return (
            <div className={`text-black h-28 w-24 flex flex-col place-content-center place-items-center font-acumin font-bold select-none rounded-md ${!props.isSec ? 'bg-white' : 'bg-gradient-to-b from-red-400 to-red-900'} max-sm:w-14 max-sm:h-[72px] max-md:w-16  max-md:h-[80px] max-lg:w-20 max-lg:h-[96px] max-xl:w-[90px] max-xl:h-[116px]` }>
                <p className="text-6xl max-md:text-3xl max-lg:test-4xl mx-xl:text-5xl">
                    {props.time}
                </p>
                <p className="text-xl max-sm:text-sm max-md:text-base max-lg:text-lg">
                    {props.timeInfo}
                </p>
            </div>
        )
    }

    return (
        <div className="bg-transparent font-acumin flex flex-wrap gap-4 max-w-[600px] place-content-between p-1  max-sm:w-[340px] max-md:w-[400px] max-lg:w-[500px] max-xl:w-[550px]   max-lg:gap-2 " >
            <CardTimer className=""
                time={rest.weeks}
                timeInfo="Weeks"
            />
            <CardTimer className=""
                time={rest.days}
                timeInfo="Days"
            />
            <CardTimer className=""
                time={rest.hours}
                timeInfo="Hr"
            />
            <CardTimer className=""
                time={rest.minutes}
                timeInfo="Min"
            />
            <CardTimer className=""
                time={rest.seconds}
                timeInfo="Sec"
                isSec={true}
            />
        </div>
    )
}