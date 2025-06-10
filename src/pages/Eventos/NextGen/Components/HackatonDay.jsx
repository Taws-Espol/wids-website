import { useState } from 'react';

export function HackatonDay({ dayHackaton }) {
  const [state, setState] = useState(false);

  const changeState = () => {
    setState(!state);
  };

  return (
    <>
      <div
        className="max-mm:gap-10 flex w-3/4 place-content-start place-items-center gap-20 rounded border-b-4 border-b-gray-700 px-10 py-10 max-md:w-[500px] max-md:flex-wrap max-sm:w-[300px] max-sm:flex-col max-sm:gap-5"
        onClick={changeState}
      >
        <div className="flex w-2/12 gap-5 max-sm:w-[270px]">
          <img
            src="/assets/Eventos/Datathon/Event.png"
            alt="logo evento"
            className="aspect-square max-h-8 object-contain shadow-2xl"
          />
          <p>{dayHackaton.date}</p>
        </div>
        <div className="flex w-3/12 gap-5 max-md:w-[250px] max-sm:w-[270px]">
          <img
            src="/assets/Eventos/Datathon/reloj.png"
            alt="reloj"
            className="aspect-square max-h-8 object-contain shadow-2xl"
          />
          <p>{dayHackaton.time}</p>
        </div>
        <div className="flex w-5/12 max-md:w-full max-sm:w-[270px]">
          {dayHackaton.topic}
        </div>
      </div>
      <div
        className={`w-3/4 border-b-4 border-l-4 border-r-4 border-y-secondary-blue border-l-secondary-green border-r-secondary-yellow ${state ? 'block' : 'hidden'}`}
      >
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
