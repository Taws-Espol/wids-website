import 'react-vertical-timeline-component/style.min.css';
import { cronograma } from '../../data/Cronograma';
import ConferenceBanner from './Components/ConferenceBanner';
import InfoBanner from './Components/InforBanner';
import AboutUs2 from './Components/AboutUs2';
import LocationBanner from './Components/LocationBanner';
import AnimatedSection from '../../shared/AnimatedSection';
import ConferencistasCarrusel from './Components/ConferencistasCarrusel';
import ProgramScheduleV2 from './Components/ProgramScheduleV2';
import Subtitle from '../../shared/Subtitle';

function Cronograma() {
  return (
    <div className="flex select-none flex-col place-content-center place-items-center gap-10">
      <AnimatedSection className="w-full">
        <ConferenceBanner />
      </AnimatedSection>
      <AnimatedSection className="w-full">
        <AboutUs2 circleText="Ubicación" bgImage="/assets/stemK.png" />
      </AnimatedSection>
      <AnimatedSection>
        <LocationBanner
          title="Edificio STEM, ESPOL"
          address="Campus Gustavo Galindo, Km. 30 vía Perimetral"
          mapLink="https://maps.app.goo.gl/Fd1ic87RpcngiZCNA" // Link de ejemplo a Google Maps
        />
      </AnimatedSection>

      <AnimatedSection>{/*<InfoBanner />*/}</AnimatedSection>
      <Subtitle title="Programa" bgColor="#ff7800" />
      <AnimatedSection>
        <ProgramScheduleV2 events={cronograma.agendaEvents} />
      </AnimatedSection>
      <AnimatedSection className="w-full">
        <ConferencistasCarrusel />
      </AnimatedSection>
    </div>
  );
}

export default Cronograma;
