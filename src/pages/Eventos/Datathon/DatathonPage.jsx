import { DatathonInfo } from '../../../data/Eventos/Datathon';
import Subtitle from '../../../shared/Subtitle';
import Separator from './Components/Separator';
import FeaturesGrid from './Components/FeaturesGrid';
import AnimatedSection from './../../../shared/AnimatedSection';
import { cronograma } from '../../../data/Cronograma';
import EventCarrusel from '../../Home/Components/EventCarrusel.jsx';
import ProgramScheduleV3 from '../../Cronograma/Components/ProgramScheduleV3.jsx';

//provicional url photo
import image1 from '/assets/Eventos/Datathon/2025/IMG-20250425-WA0073.webp';
import image2 from '/assets/Eventos/Datathon/2025/IMG-20250425-WA0076.webp';
import image3 from '/assets/Eventos/Datathon/2025/IMG-20250425-WA0097.webp';
import image4 from '/assets/Eventos/Datathon/2025/IMG-20250430-WA0160.webp';
import image5 from '/assets/Eventos/Datathon/2025/IMG-20250512-WA0076.webp';

function Datathon() {
  const div1 = DatathonInfo[0];
  const div2 = DatathonInfo[1];
  const infos_dvi2 = div2.infos;
  const div5 = DatathonInfo[4];
  const cronograma_antiguo = div5.crono;
  const div6 = DatathonInfo[5];
  const infos_dvi6 = div6.infos;

  const slides = [
    {
      url: image1,
    },
    {
      url: image2,
    },
    {
      url: image3,
    },
    {
      url: image4,
    },
    {
      url: image5,
    },
  ];

  const fixedText = {
    title: 'DATATHON',
    description: 'Diagnóstico de Cáncer Metastásico en 90 Días',
    date: '18–31 de Mayo',
  };

  return (
    <div className="flex w-full select-none flex-col font-acumin">
      <EventCarrusel slides={slides} fixedText={fixedText} />
      <div className="my-10 flex flex-row items-baseline justify-center gap-16 sm:gap-24">
        {/* Columna de Duración */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-5xl font-bold text-cyan-600 md:text-6xl">
            4 días
          </h3>
          <p className="mt-1 text-xl font-semibold text-gray-900 md:text-2xl">
            Duración
          </p>
        </div>

        {/* Columna de Premio */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-5xl font-bold text-green-800 md:text-6xl">
            $100
          </h3>
          <p className="mt-1 text-xl font-semibold text-gray-900 md:text-2xl">
            1er Lugar
          </p>
        </div>
      </div>
      <Subtitle title="Problema a resolver" bgColor="#00a7d5" />
      <p className="w-full py-2 text-center text-[20px] font-bold">
        Desentrañando los Misterios del Cerebro Femenino{' '}
      </p>
      <FeaturesGrid />
      <Subtitle title="Participantes" bgColor="#00432d" />
      <div className="flex flex-col items-center justify-center px-10 py-5 lg:flex-row">
        <div className="mx-4 my-4 flex flex-col items-center md:my-0 md:w-1/5">
          <img
            src="/assets/Eventos/Datathon/espol.webp"
            alt="Logo"
            className="h-[92px] w-[120px] object-cover"
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
      <Subtitle title="Cronograma" bgColor="#ff7800" />
      <AnimatedSection>
        <div>
          <ProgramScheduleV3 data={cronograma.Talleres} eventType="Talleres" />
        </div>
      </AnimatedSection>
    </div>
  );
}

export default Datathon;
