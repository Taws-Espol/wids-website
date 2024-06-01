import { useState } from "react";

export function HackatonDay({ dayHackaton }) {
    const [state, setState] = useState(false);

    const changeState = () => {
        setState(!state)
    }

    return (
        <>
            <div className="w-3/4  max-sm:flex-col max-md:flex-wrap  max-sm:w-[300px] max-md:w-[500px] rounded flex place-content-start place-items-center py-10 px-10 border-b-4 border-b-gray-700 gap-20 max-sm:gap-5 max-mm:gap-10" onClick={changeState}>
                <div className="flex gap-5 w-2/12 max-sm:w-[270px]">
                    <img src="/assets/Eventos/Datathon/Event.png" alt="logo evento" className="max-h-8 aspect-square object-contain shadow-2xl" />
                    <p>
                        {dayHackaton.date}
                    </p>
                </div>
                <div className="flex gap-5 w-3/12 max-sm:w-[270px] max-md:w-[250px]">
                    <img src="/assets/Eventos/Datathon/reloj.png" alt="reloj" className="max-h-8 aspect-square object-contain shadow-2xl" />
                    <p>{dayHackaton.time}</p>
                </div>
                <div className="flex w-5/12 max-sm:w-[270px] max-md:w-full" >
                    {dayHackaton.topic}
                </div>
            </div>
            <div className={`w-3/4 border-r-4 border-l-4 border-b-4  border-l-secondary-green border-y-secondary-blue border-r-secondary-yellow ${state ? 'block' : 'hidden'}`}>
                <ul>
                    {dayHackaton.content.map((item, index) => (
                        <li key={index} className="">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}