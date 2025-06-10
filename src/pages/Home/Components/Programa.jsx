import { ediciones } from '../../../data/ediciones';
import { CardPrograma } from './CardPrograma';

function Programa() {
  const year = '2024';
  const edicionData = ediciones.find((edicion) => edicion.edicion === year);

  return (
    <div className="flex flex-col gap-5">
      {edicionData.conferencistas.map((conferencista, index) => (
        <CardPrograma key={index} conferencista={conferencista} />
      ))}
    </div>
  );
}

export default Programa;
