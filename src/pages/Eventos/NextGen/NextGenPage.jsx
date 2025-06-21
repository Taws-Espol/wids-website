import AnimatedSection from './../../../shared/AnimatedSection';
import InfoSection from './Components/InfoSection';
import Requirements from './Components/Requirements';
import Subtitle from '../../../shared/Subtitle';
import NewTallerista from './Components/NewTallerista';
import ProgramSchedule from '../../Cronograma/Components/ProgramSchedule';
import { cronograma } from '../../../data/Cronograma';
import EventCarrusel from '../../Home/Components/EventCarrusel.jsx';

const slides = [
  {
    url: '../../../../public/assets/Eventos/NextGen/NextGen_empoderando.webp',
  },
  {
    url: 'https://i.pinimg.com/736x/17/26/0a/17260a1d8cc3f8729eaa454da2342bbc.jpg',
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
        <InfoSection
          textLeft="Un taller dirigido a jóvenes de bachillerato, el cual se llevará a cabo en los laboratorios de la Facultad de Ingeniería Eléctrica y Computación (FIEC) de la ESPOL."
          textRight="El contenido del taller consta de 3 secciones: Introducción a la Ciencia de Datos, Estadística básica y Visualizaciones, donde los estudiantes podrán reforzar los conocimientos adquiridos."
          leftImage="/assets/images/taller1.jpg"
          rightImage="/assets/images/taller2.jpg"
        />

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
          <ProgramSchedule events={cronograma.NextGen} />
        </div>
      </AnimatedSection>
    </AnimatedSection>
  );
}

export default NextGen;
