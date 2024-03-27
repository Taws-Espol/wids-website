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

            // Calcula el tiempo restante
            const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
            const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 7);
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            
            // console.log(difference,weeks,days,hours,minutes,seconds);
            setTime({ weeks, days, hours, minutes, seconds });
        };
        const intervalId = setInterval(updateCountdown, 1000);
        return () => clearInterval(intervalId);
    }
    
    useEffect(()=>{
        updateTime(Event_date);
    });

    function Cuadro(props) {

        return (
            <div className={`text-white h-28 w-24 flex flex-col place-content-center place-items-center font-bold select-none  ${!props.isSec ? 'bg-gradient-to-b from-zinc-400 to-zinc-700' : 'bg-gradient-to-b from-pink-200 to-pink-500'}`}>
                <p className="text-4xl">
                    {props.time}
                </p>
                <p className="text-xl">
                    {props.timeInfo}
                </p>
            </div>
        )
    }

    return (
        <div className="bg-black flex flex-wrap gap-4 max-w-xl place-content-between p-1">
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