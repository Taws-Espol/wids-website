import { DatathonInfo } from "../../../data/Eventos/Datathon";
import { TimeLine } from "../../Cronograma/Components/TimeLineDatathon";
import Hero from "./Components/Hero";

import Separator from "./Components/Separator";

function Datathon() {
  const div1 = DatathonInfo[0];
  const div2 = DatathonInfo[1];
  const infos_dvi2 = div2.infos;
  const div5 = DatathonInfo[4];
  const cronograma = div5.crono;
  const div6 = DatathonInfo[5];
  const infos_dvi6 = div6.infos;

  return (
    <div className="w-full select-none flex flex-col font-acumin">
      <div
        className="justify-items-center py-5 
                pl-6 md:pl-16 lg:pl-32 xl:pl-40 2xl:pl-48 "
      >
        <h1
          className=" md:items-stretch text-6xl sm:text-7xl
                md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl font-bold
                text-center md:text-left text-primary-dark-green"
        >
          Datathon
        </h1>
      </div>
      <Hero title={div1.title} link={div1.linkform}></Hero>

      <div
        className="flex flex-col lg:flex-row lg:h-[180px] lg:relative 
          place-content-center place-items-center
          my-16 font-semibold flex-wrap gap-20"
      >
        <div
          className="flex flex-col text-center lg:text-start lg:absolute
            lg:inset-y-5 lg:left-14 lg:w-1/6"
        >
          <h3 className="text-6xl lg:text-7xl font-bold text-cyan-600">
            {div1.duration}
          </h3>
          <p className="text-4xl lg:text-5xl text-gray-800">Duración</p>
        </div>

        <div className=" flex flex-col text-center lg:absolute lg:inset-0 lg:mx-6">
          <h3 className="text-6xl lg:text-9xl  font-bold text-primary-dark-green">
            {div1.premio}
          </h3>
          <p className="text-4xl lg:text-6xl text-gray-800 font-bold ">
            1er Lugar
          </p>
        </div>

        <div
          className="flex flex-col text-center lg:text-end lg:absolute
            lg:inset-y-5 lg:right-14 lg:w-1/6"
        >
          <h3 className="text-4xl lg:text-5xl font-bold text-orange-600 mb-3">
            {div1.dates}
          </h3>
          <p className="text-4xl lg:text-5xl text-gray-800">Fechas</p>
        </div>
      </div>

      <div className="bg-cyan-600 flex justify-center items-center px-10 py-5 sm:mt-10 sm:mb-10">
        <div className="text-center">
          <h3 className="text-5xl sm:text-7xl font-bold text-white mb-2">
            Problema por resolver
          </h3>
        </div>
      </div>

      <div className="flex justify-center items-center p-10">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-primary-dark-green">
            {div2.msg}
          </h3>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center px-10 py-5">
        <div className="flex flex-col items-center md:w-1/5 mx-5 my-4 md:my-0">
          <img
            src="/assets/Eventos/Datathon/informe-medico.webp"
            alt="Logo"
            className="w-[92px] h-[92px] object-cover "
          />
          <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
            <p>{infos_dvi2[0]}</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center md:w-1/5 mx-5 my-4 md:my-0">
          <img
            src="/assets/Eventos/Datathon/tierra.webp"
            alt="Logo"
            className="w-[92px] h-[92px] object-cover "
          />
          <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
            <p>{infos_dvi2[1]}</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center md:w-1/5 mx-5 my-4 md:my-0">
          <img
            src="/assets/Eventos/Datathon/medico.webp"
            alt="Logo"
            className="w-[92px] h-[92px] object-cover"
          />
          <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
            <p>{infos_dvi2[2]}</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center md:w-1/5 mx-5 my-4 md:my-0">
          <img
            src="/assets/Eventos/Datathon/analitica.webp"
            alt="Logo"
            className="w-[92px] h-[92px] object-cover"
          />
          <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
            <p>{infos_dvi2[3]}</p>
          </div>
        </div>
      </div>

      <div className="bg-orange-600 flex  justify-center items-center px-10 py-5 mt-10 mb-10">
        <div className="text-center">
          <h3 className="text-5xl sm:text-7xl font-bold text-white mb-2">
            Participantes
          </h3>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center px-10 py-5">
        <div className="flex flex-col items-center md:w-1/5 mx-5 my-4 md:my-0">
          <img
            src="/assets/Eventos/Datathon/espol.webp"
            alt="Logo"
            className="w-[92px] h-[92px] object-cover "
          />
          <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
            <p>{infos_dvi6[0]}</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center md:w-1/5 mx-5 my-4 md:my-0">
          <img
            src="/assets/Eventos/Datathon/colaboracion.webp"
            alt="Logo"
            className="w-[92px] h-[92px] object-cover "
          />
          <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
            <p>{infos_dvi6[1]}</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center md:w-1/5 mx-5 my-4 md:my-0">
          <img
            src="/assets/Eventos/Datathon/mujer.webp"
            alt="Logo"
            className="w-[92px] h-[92px] object-cover"
          />
          <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
            <p>{infos_dvi6[2]}</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center md:w-1/5 mx-5 my-4 md:my-0">
          <img
            src="/assets/Eventos/Datathon/registro.webp"
            alt="Logo"
            className="w-[92px] h-[92px] object-cover"
          />
          <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
            <p>{infos_dvi6[3]}</p>
          </div>
        </div>
      </div>
      <div className="bg-green-600 flex  justify-center items-center px-10 py-5 mt-10 mb-10">
        <div className="text-center">
          <h3 className="text-5xl sm:text-7xl font-bold text-white mb-2">
            Cronograma
          </h3>
        </div>
      </div>
      <div className="w-full">{<TimeLine Data={cronograma} />}</div>
    </div>
  );
}

export default Datathon;
