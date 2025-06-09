import React, { useState, useEffect } from 'react';
import { Label } from './Label';
import { CardInfo } from './CardInfo';
import { cronograma } from '../../../data/Cronograma.js';

export function ListCardInfo({ typeLabel }) {
  const [hidden, setHidden] = useState(false);
  const breakpoint = 1025;

  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < breakpoint) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  let listaEventos;
  switch (typeLabel) {
    case 'Conferencias':
      listaEventos = cronograma.Conferencias;
      break;
    case 'Talleres':
      listaEventos = cronograma.Talleres;
      break;
    default:
      listaEventos = cronograma.Conferencias;
      break;
  }

  return (
    <div className="gap-15 flex flex-col">
      <Label
        type={typeLabel}
        hiddenDiv={() => setHidden(!hidden)}
        stateHidden={hidden}
      />
      <div
        className={`${hidden ? 'hidden' : 'block'} flex flex-col place-content-center place-items-center gap-4 py-4`}
      >
        {listaEventos.map((evento) => (
          <CardInfo
            type={evento.type}
            title={evento.title}
            info={evento.info}
          />
        ))}
      </div>
    </div>
  );
}
