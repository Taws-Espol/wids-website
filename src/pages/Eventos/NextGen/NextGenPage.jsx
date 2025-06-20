import { NextGenInfo } from './../../../data/Eventos/NextGen';
import AnimatedSection from './../../../shared/AnimatedSection';
import { CardRequirement } from './Components/CardRequirements';
import { ColBenef } from './Components/ColBene';
import { CardInfoEdition } from './../../Edicion/Components/CardInfoEdition';
import { ediciones } from './../../../data/ediciones';
import InfoSection from './Components/InfoSection';
import Requirements from './Components/Requirements';
import Subtitle from '../../../shared/Subtitle';
import NewTallerista from './Components/NewTallerista';
import ProgramSchedule from '../../Cronograma/Components/ProgramSchedule';
import { cronograma } from '../../../data/Cronograma';

function NextGen() {
  const edicionData = ediciones.find((edicion) => edicion.edicion == 2024);

  return (
    <AnimatedSection>
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
        <NewTallerista />
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
