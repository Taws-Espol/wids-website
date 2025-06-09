import { DatathonInfo } from '../../../data/Eventos/Datathon';
import { TimeLine } from '../../Cronograma/Components/TimeLineDatathon';
import Hero from './Components/Hero';

import Separator from './Components/Separator';

function Datathon() {
  const div1 = DatathonInfo[0];
  const div2 = DatathonInfo[1];
  const infos_dvi2 = div2.infos;
  const div5 = DatathonInfo[4];
  const cronograma = div5.crono;
  const div6 = DatathonInfo[5];
  const infos_dvi6 = div6.infos;

  return (
    <div className="flex w-full select-none flex-col font-acumin">
      <div className="justify-items-center py-5 pl-6 md:pl-16 lg:pl-32 xl:pl-40 2xl:pl-48">
        <h1 className="xl:text-10xl 2xl:text-11xl text-center text-6xl font-bold text-primary-dark-green sm:text-7xl md:items-stretch md:text-left md:text-8xl lg:text-9xl">
          Datathon
        </h1>
      </div>
      <Hero title={div1.title} link={div1.linkform}></Hero>

      <div className="my-16 flex flex-col flex-wrap place-content-center place-items-center gap-20 font-semibold lg:relative lg:h-[180px] lg:flex-row">
        <div className="flex flex-col text-center lg:absolute lg:inset-y-5 lg:left-14 lg:w-1/6 lg:text-start">
          <h3 className="text-6xl font-bold text-cyan-600 lg:text-7xl">
            {div1.duration}
          </h3>
          <p className="text-4xl text-gray-800 lg:text-5xl">Duración</p>
        </div>

        <div className="flex flex-col text-center lg:absolute lg:inset-0 lg:mx-6">
          <h3 className="text-6xl font-bold text-primary-dark-green lg:text-9xl">
            {div1.premio}
          </h3>
          <p className="text-4xl font-bold text-gray-800 lg:text-6xl">
            1er Lugar
          </p>
        </div>

        <div className="flex flex-col text-center lg:absolute lg:inset-y-5 lg:right-14 lg:w-1/6 lg:text-end">
          <h3 className="mb-3 text-4xl font-bold text-orange-600 lg:text-5xl">
            {div1.dates}
          </h3>
          <p className="text-4xl text-gray-800 lg:text-5xl">Fechas</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-cyan-600 px-10 py-5 sm:mb-10 sm:mt-10">
        <div className="text-center">
          <h3 className="mb-2 text-5xl font-bold text-white sm:text-7xl">
            Problema por resolver
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-primary-dark-green">
            {div2.msg}
          </h3>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-10 py-5 lg:flex-row">
        <div className="mx-5 my-4 flex flex-col items-center md:my-0 md:w-1/5">
          <img
            src="/assets/Eventos/Datathon/informe-medico.webp"
            alt="Logo"
            className="h-[92px] w-[92px] object-cover"
          />
          <div className="mb-2 mt-4 text-center text-3xl font-bold text-gray-800">
            <p>{infos_dvi2[0]}</p>
          </div>
        </div>
        <Separator />
        <div className="mx-5 my-4 flex flex-col items-center md:my-0 md:w-1/5">
          <img
            src="/assets/Eventos/Datathon/tierra.webp"
            alt="Logo"
            className="h-[92px] w-[92px] object-cover"
          />
          <div className="mb-2 mt-4 text-center text-3xl font-bold text-gray-800">
            <p>{infos_dvi2[1]}</p>
          </div>
        </div>
        <Separator />
        <div className="mx-5 my-4 flex flex-col items-center md:my-0 md:w-1/5">
          <img
            src="/assets/Eventos/Datathon/medico.webp"
            alt="Logo"
            className="h-[92px] w-[92px] object-cover"
          />
          <div className="mb-2 mt-4 text-center text-3xl font-bold text-gray-800">
            <p>{infos_dvi2[2]}</p>
          </div>
        </div>
        <Separator />
        <div className="mx-5 my-4 flex flex-col items-center md:my-0 md:w-1/5">
          <img
            src="/assets/Eventos/Datathon/analitica.webp"
            alt="Logo"
            className="h-[92px] w-[92px] object-cover"
          />
          <div className="mb-2 mt-4 text-center text-3xl font-bold text-gray-800">
            <p>{infos_dvi2[3]}</p>
          </div>
        </div>
      </div>

      <div className="mb-10 mt-10 flex items-center justify-center bg-orange-600 px-10 py-5">
        <div className="text-center">
          <h3 className="mb-2 text-5xl font-bold text-white sm:text-7xl">
            Participantes
          </h3>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-10 py-5 lg:flex-row">
        <div className="mx-5 my-4 flex flex-col items-center md:my-0 md:w-1/5">
          <img
            src="/assets/Eventos/Datathon/espol.webp"
            alt="Logo"
            className="h-[92px] w-[92px] object-cover"
          />
          <div className="mb-2 mt-4 text-center text-3xl font-bold text-gray-800">
            <p>{infos_dvi6[0]}</p>
          </div>
        </div>
        <Separator />
        <div className="mx-5 my-4 flex flex-col items-center md:my-0 md:w-1/5">
          <img
            src="/assets/Eventos/Datathon/colaboracion.webp"
            alt="Logo"
            className="h-[92px] w-[92px] object-cover"
          />
          <div className="mb-2 mt-4 text-center text-3xl font-bold text-gray-800">
            <p>{infos_dvi6[1]}</p>
          </div>
        </div>
        <Separator />
        <div className="mx-5 my-4 flex flex-col items-center md:my-0 md:w-1/5">
          <img
            src="/assets/Eventos/Datathon/mujer.webp"
            alt="Logo"
            className="h-[92px] w-[92px] object-cover"
          />
          <div className="mb-2 mt-4 text-center text-3xl font-bold text-gray-800">
            <p>{infos_dvi6[2]}</p>
          </div>
        </div>
        <Separator />
        <div className="mx-5 my-4 flex flex-col items-center md:my-0 md:w-1/5">
          <img
            src="/assets/Eventos/Datathon/registro.webp"
            alt="Logo"
            className="h-[92px] w-[92px] object-cover"
          />
          <div className="mb-2 mt-4 text-center text-3xl font-bold text-gray-800">
            <p>{infos_dvi6[3]}</p>
          </div>
        </div>
      </div>
      <div className="mb-10 mt-10 flex items-center justify-center bg-green-600 px-10 py-5">
        <div className="text-center">
          <h3 className="mb-2 text-5xl font-bold text-white sm:text-7xl">
            Cronograma
          </h3>
        </div>
      </div>
      <div className="w-full">{<TimeLine Data={cronograma} />}</div>
    </div>
  );
}

export default Datathon;
