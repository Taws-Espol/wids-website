import { ConferenceContainer } from './Components/ConferencesContainer';
import AnimatedSection from './../../shared/AnimatedSection';
import { ediciones } from '../../data/ediciones';
function Conferencistas() {
  const year = '2024';
  const edicionData = ediciones.find((edicion) => edicion.edicion === year);
  return (
    <AnimatedSection>
      <div className="flex w-full select-none flex-col place-content-center place-items-center font-acumin">
        <div className="relative mb-20 mt-10 flex w-full items-center justify-center text-center">
          <div
            id="rectangulo_corneL"
            className="sm:w-1/7 absolute bottom-[-19px] left-5 z-[5] h-24 w-1/3 bg-custom-peach sm:bottom-[-20px] sm:left-10 sm:h-32 md:bottom-[-20px] md:left-14 md:h-40 md:w-1/4 lg:bottom-[-30px] lg:left-8 lg:h-48 lg:w-1/4"
          ></div>
          <div
            id="rectangulo_corneR"
            className="sm:w-1/7 absolute right-5 top-[110px] z-[5] h-24 w-1/3 bg-custom-purple sm:right-10 sm:top-[110px] sm:h-32 md:right-14 md:top-[110px] md:h-40 md:w-1/5 lg:right-8 lg:top-[-30px] lg:h-48 lg:w-1/4"
          ></div>
          <div className="flex w-full flex-col place-content-center place-items-center items-center max-lg:mt-32">
            <img
              src="/assets/Conferences/conference.webp"
              alt="conference"
              className="md:w-9/10 relative z-[10] h-72 w-10/12 object-cover object-top sm:h-80 sm:w-10/12 md:h-72 lg:h-96 lg:w-11/12"
            ></img>
          </div>
          <div
            id="rectangulo_text"
            className="h-34 absolute left-0 top-[-30px] z-[15] w-full bg-custom-gre lg:left-20 lg:w-96"
          >
            <h1 className="mb-4 mt-2 text-5xl font-bold text-white">
              Conferencistas
            </h1>
            <h1 className="mb-4 text-5xl font-bold text-white">WIDS</h1>
          </div>
        </div>
        <div className="mb-10 w-3/4">
          <ConferenceContainer edicionData={edicionData} />
        </div>
      </div>
    </AnimatedSection>
  );
}
export default Conferencistas;
