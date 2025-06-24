import AnimatedSection from './../../../shared/AnimatedSection';
import InfoSection from './Components/InfoSection';
import Requirements from './Components/Requirements';
import Subtitle from '../../../shared/Subtitle';
import NewTallerista from './Components/NewTallerista';
import ProgramSchedule from '../../Cronograma/Components/ProgramSchedule';
import { cronograma } from '../../../data/Cronograma';
import EventCarrusel from '../../Home/Components/EventCarrusel.jsx';
import ProgramScheduleV3 from '../../Cronograma/Components/ProgramScheduleV3.jsx';

const slides = [
  {
    url: '../../../../public/assets/Eventos/NextGen/MG_2769.webp',
  },
  {
    url: '../../../../public/assets/Eventos/NextGen/NextGen_empoderando.webp',
  },
];

const fixedText = {
  title: 'NEXTGEN',
  description: '28 de Junio',
  date: 'ESPOL',
};

function NextGen() {
  return (
    <AnimatedSection>
      <EventCarrusel slides={slides} fixedText={fixedText} />
      <div className="flex w-full select-none flex-col place-content-center place-items-center overflow-x-hidden pb-10 font-acumin">
        <InfoSection />
        <Subtitle title="¿Cómo ser parte?" bgColor="#00a7d5" />
        <Requirements />
        <Subtitle title="Talleristas" bgColor="#00422b" />
      </div>
      <div className="my-5 flex flex-col place-content-center place-items-center gap-10">
        <NewTallerista infotallertista={cronograma.NextGen} />
      </div>

      <Subtitle title="Cronograma" bgColor="#ff7800" />

      <AnimatedSection>
        <div>
          <ProgramScheduleV3 data={cronograma.NextGen} eventType="NextGen" />
        </div>
      </AnimatedSection>
    </AnimatedSection>
  );
}

export default NextGen;
