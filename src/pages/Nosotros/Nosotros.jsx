import AboutUsCard from "./Components/AboutUsCard";
import AnimatedSection from "./../../shared/AnimatedSection";
import { ConferenceContainer } from "./../Conferencistas/Components/ConferencesContainer";
import { ediciones } from "./../../data/ediciones";
function Nosotros() {
  const edicionData = ediciones.find((edicion) => edicion.edicion == 2024);
  return (
    <>
      <AnimatedSection>
        <div
          className="flex px-5 justify-center 
            md:justify-start py-7 sm:pl-20 md:pl-40"
        >
          <h1
            className="font-acumin text-[#1e4620] text-center md:text-left
              font-bold text-7xl sm:text-5xl md:text-5xl lg:text-6xl select-none"
          >
            Sobre Nosotros
          </h1>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <section className="w-full select-none pt-5 pb-20">
          <div className="flex flex-col md:flex-row gap-5">
            <div
              className=" flex-grow md:w-1/2 px-5 grid
              place-content-center place-items-center"
            >
              <AboutUsCard />
            </div>
            <div className="flex-grow md:w-1/2 pl-5 pr-10 grid place-content-center place-items-center">
              <p className="!text-justify md:text-left text-xs sm:text-base md:text-lg lg:text-xl xl:text-xl font-acumin">
                {/* Texto de Lorem Ipsum */}
                WiDS Guayaquil@ESPOL es un evento independiente organizado por la
                PhD. Carmen Vaca con sede en la Escuela Superior Politécnica del
                Litoral (ESPOL), que coincide con la conferencia anual global de
                Women in Data Science (WiDS) realizada por la Universidad de
                Stanford y aproximadamente más de 150 localidades en todo el
                mundo. Todas las personas están invitadas a asistir a los eventos
                regionales de WiDS, que presentan mujeres destacadas que realizan
                un trabajo excepcional.
              </p>
            </div>
          </div>
        </section>
        <div className="w-full flex flex-col place-content-center place-items-center">
          <p className="font-acumin font-bold text-primary-dark-green text-5xl pb-10">
            Embajadoras
          </p>
          <div className="w-3/4 mb-10 flex place-content-center place-items-center">
              <ConferenceContainer edicionData={edicionData} campo="embajadoras" />
            </div>
        </div>
        <div className="w-full flex flex-col place-content-center place-items-center my-20">
          <p className="font-acumin font-bold text-primary-dark-green text-5xl pb-10">
            Coembajadoras
          </p>
          <div className="w-3/4 mb-10 flex place-content-center place-items-center">
              <ConferenceContainer edicionData={edicionData} campo="coembajadoras" />
            </div>
        </div>
      </AnimatedSection>
    </>
  );
}

export default Nosotros;
