import { ConferenceContainer } from './Components/ConferencesContainer';
import AnimatedSection from './../../shared/AnimatedSection';
import { ediciones } from '../../data/ediciones';
function Conferencistas() {
  const year = '2025';
  const edicionData = ediciones.find((edicion) => edicion.edicion === year);
  return (
    <AnimatedSection>
      <div className="flex w-full select-none flex-col place-content-center place-items-center font-acumin">
        <div className="relative flex w-full items-center justify-center text-center">
          <div className="flex w-full flex-col place-content-center place-items-center items-center max-lg:mt-32">
            <img
              src="/assets/Conferences/conference.webp"
              alt="conference"
              className="relative z-[10] h-[400px] w-full object-cover object-top"
            ></img>
          </div>
        </div>
        <div
          id="rectangulo_text"
          className="z-[15] w-full bg-custom-gre py-6 text-center lg:left-20"
        >
          <h1 className="text-5xl font-bold text-white">Conferencistas WiDS</h1>
        </div>

        <div className="mb-10 w-3/4">
          <ConferenceContainer edicionData={edicionData} />
        </div>
      </div>
    </AnimatedSection>
  );
}
export default Conferencistas;
