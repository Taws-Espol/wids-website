import { ButtonEditionComponents } from '../Edicion/Components/ButtonEditionComponents';
import { useState } from 'react';
import { TimeLine } from './Components/TimeLine';
import 'react-vertical-timeline-component/style.min.css';
import { cronograma } from '../../data/Cronograma';
function Cronograma() {
  const [active, setActive] = useState('Conferencias');

  const changeButton = (place) => {
    setActive(place);
  };

  return (
    <div className="flex select-none flex-col place-content-center place-items-center gap-10">
      <h1 className="font-acumin pt-5 text-4xl font-bold text-primary-dark-green">
        Cronograma
      </h1>
      <div className="w-full">
        {<TimeLine Data={cronograma} active={active} />}
      </div>
    </div>
  );
}

export default Cronograma;
