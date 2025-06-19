import { ButtonEditionComponents } from '../Edicion/Components/ButtonEditionComponents';
import { useState } from 'react';
import { TimeLine } from './Components/TimeLine';
import 'react-vertical-timeline-component/style.min.css';
import { cronograma } from '../../data/Cronograma';
import ConferenceBanner from './Components/ConferenceBanner';
import InfoBanner from './Components/InforBanner';
import ProgramSchedule from './Components/ProgramSchedule';
import AboutUs2 from './Components/AboutUs2';
import LocationBanner from './components/LocationBanner';
function Cronograma() {
  const [active, setActive] = useState('Conferencias');

  const changeButton = (place) => {
    setActive(place);
  };

  return (
    <div className="flex select-none flex-col place-content-center place-items-center gap-10">
      <ConferenceBanner />
      <AboutUs2 circleText="Ubicación" bgImage="/assets/stemK.png" />
      <LocationBanner
        title="Edificio STEM, ESPOL"
        address="Campus Gustavo Galindo, Km. 30 vía Perimetral"
        mapLink="https://www.google.com/maps/place/ESPOL+Campus+Gustavo+Galindo/@-2.1464923,-79.9652514,15z" // Link de ejemplo a Google Maps
      />
      <InfoBanner />

      <div>
        <ProgramSchedule events={cronograma.Conferencias} />
      </div>
    </div>
  );
}

export default Cronograma;
