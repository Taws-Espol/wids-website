import { ButtonEditionComponents } from '../Edicion/Components/ButtonEditionComponents';
import { useState } from 'react';
import { TimeLine } from './Components/TimeLine';
import 'react-vertical-timeline-component/style.min.css';
import { cronograma } from '../../data/Cronograma';
import ConferenceBanner from './Components/ConferenceBanner';
import InfoBanner from './Components/InforBanner';
import ProgramSchedule from './Components/ProgramSchedule';
import AboutUs2 from './Components/AboutUs2';
import LocationBanner from './Components/LocationBanner';
import AnimatedSection from '../../shared/AnimatedSection';
import ConferencistasCarrusel from './Components/ConferencistasCarrusel';
import CarruselConferences from '../Home/Components/CarruselConferences';

function Cronograma() {
  const [active, setActive] = useState('Conferencias');

  const changeButton = (place) => {
    setActive(place);
  };

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
          mapLink="https://www.google.com/maps/place/ESPOL+Campus+Gustavo+Galindo/@-2.1464923,-79.9652514,15z" // Link de ejemplo a Google Maps
        />
      </AnimatedSection>
      <AnimatedSection>
        <InfoBanner />
      </AnimatedSection>
      <AnimatedSection>
        <div>
          <ProgramSchedule events={cronograma.Conferencias} />
        </div>
      </AnimatedSection>
      <AnimatedSection className="w-full">
        <ConferencistasCarrusel />
      </AnimatedSection>
    </div>
  );
}

export default Cronograma;
