import AboutUsCard from './Components/AboutUsCard';
import AnimatedSection from './../../shared/AnimatedSection';
import { ConferenceContainer } from './../Conferencistas/Components/ConferencesContainer';
import { ediciones } from './../../data/ediciones';
import Subtitle from '../../shared/Subtitle';
function Nosotros() {
  const edicionData = ediciones.find((edicion) => edicion.edicion == 2025);
  return (
    <>
      <AnimatedSection>
        <div className="flex justify-center px-5 py-7 sm:pl-20 md:justify-start md:pl-40">
          <h1 className="select-none text-center font-acumin text-7xl font-bold text-[#1e4620] sm:text-5xl md:text-left md:text-5xl lg:text-6xl">
            Sobre Nosotros
          </h1>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <section className="w-full select-none pb-20 pt-5">
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="grid flex-grow place-content-center place-items-center px-5 md:w-1/2">
              <AboutUsCard />
            </div>
            <div className="grid flex-grow place-content-center place-items-center pl-5 pr-10 md:w-1/2">
              <p className="!text-justify font-acumin text-xs sm:text-base md:text-left md:text-lg lg:text-xl xl:text-xl">
                {/* Texto de Lorem Ipsum */}
                WiDS Guayaquil@ESPOL es un evento independiente organizado por
                la PhD Carmen Vaca con sede en la Escuela Superior Politécnica
                del Litoral (ESPOL), que coincide con la conferencia anual
                global de Women in Data Science (WiDS) realizada por la
                Universidad de Stanford y aproximadamente más de 150 localidades
                en todo el mundo. Todas las personas están invitadas a asistir a
                los eventos regionales de WiDS, que presentan mujeres destacadas
                que realizan un trabajo excepcional.
              </p>
            </div>
          </div>
        </section>
        <div className="flex w-full flex-col place-content-center place-items-center">
          <Subtitle title="Embajadoras" bgColor="#00a7d5" />
          <div className="mb-10 flex w-3/4 place-content-center place-items-center">
            <ConferenceContainer
              edicionData={edicionData}
              campo="embajadoras"
              div_principal="div_embajadoras"
            />
          </div>
        </div>
        <div className="my-20 flex w-full flex-col place-content-center place-items-center">
          <Subtitle title="Coembajadoras" bgColor="#00422b" />
          <div className="mb-10 flex w-3/4 place-content-center place-items-center">
            <ConferenceContainer
              edicionData={edicionData}
              campo="coembajadoras"
              div_principal="div_coembajadoras"
            />
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}

export default Nosotros;
