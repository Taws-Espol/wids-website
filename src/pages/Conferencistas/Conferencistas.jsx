import { ConferenceContainer } from "./Components/ConferencesContainer";
import AnimatedSection from "./../../shared/AnimatedSection";
import { ediciones } from "../../data/ediciones";
function Conferencistas() {
  const year = "2024";
  const edicionData = ediciones.find((edicion) => edicion.edicion === year);
  return (
    <AnimatedSection>
      <div className="font-acumin flex flex-col place-content-center place-items-center w-full select-none">
        <div className="w-full flex justify-center items-center text-center relative mt-10 mb-20">
          <div
            id="rectangulo_corneL"
            className="absolute bottom-[-19px] left-5 w-1/3 h-24 bg-custom-peach z-[5] 
        sm:w-1/7 sm:h-32 sm:bottom-[-20px] sm:left-10 
        md:w-1/4 md:h-40 md:bottom-[-20px] md:left-14
        lg:w-1/4 lg:h-48 lg:bottom-[-30px] lg:left-8"
          ></div>
          <div
            id="rectangulo_corneR"
            className="absolute top-[110px] right-5 w-1/3 h-24 bg-custom-purple z-[5] 
        sm:w-1/7 sm:h-32 sm:top-[110px] sm:right-10 
        md:w-1/5 md:h-40 md:top-[110px] md:right-14
        lg:w-1/4 lg:h-48 lg:top-[-30px] lg:right-8"
          ></div>
          <div className="flex flex-col w-full items-center place-content-center place-items-center max-lg:mt-32">
            <img
              src="/assets/Conferences/conference.webp"
              alt="conference"
              className="w-10/12 h-72 object-cover object-top relative z-[10] 
            sm:w-10/12 sm:h-80 
            md:w-9/10 md:h-72 
            lg:w-11/12 lg:h-96"
            ></img>
          </div>
          <div
            id="rectangulo_text"
            className="absolute top-[-30px] lg:left-20 lg:w-96 h-34 left-0 w-full bg-custom-gre z-[15]"
          >
            <h1 className="text-5xl font-bold mb-4 mt-2 text-white">
              Conferencistas
            </h1>
            <h1 className="text-5xl font-bold mb-4 text-white">WIDS</h1>
          </div>
        </div>
        <div className="w-3/4 mb-10">
          <ConferenceContainer edicionData={edicionData} />
        </div>
      </div>
    </AnimatedSection>
  );
}
export default Conferencistas;
