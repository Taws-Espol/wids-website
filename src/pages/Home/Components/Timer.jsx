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
            <div className={`text-black h-[14vw] w-[13vw] sm:h-[12vw] sm:w-[11vw] md:h-[11vw] md:w-[10vw] xl:h-[8rem] rounded-[2vw] xl:w-[7rem] min-[1536px]:h-36 min-[1536px]:w-32 flex flex-col place-content-center place-items-center font-acumin font-bold select-none md:rounded-2xl ${!props.isSec ? 'bg-white' : 'bg-primary-dark-green text-white'}` }>
                <p className="text-[5.5vw] sm:text-[4.5vw] md:text-[4vw] xl:text-6xl">
                    {props.time}
                </p>
                <p className="text-[3.5vw] sm:text-[2.5vw] md:text-[2vw] xl:text-xl">
                    {props.timeInfo}
                </p>
            </div>
        )
    }

    return (
        <div className="bg-transparent font-acumin flex flex-wrap gap-[2vw] md:gap-4 place-content-between p-1" >
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
