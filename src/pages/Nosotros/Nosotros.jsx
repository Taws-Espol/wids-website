import  AboutUsCard  from "./Components/AboutUsCard";
function Nosotros() {
  return (
    <>
      <div
        className="flex px-5 justify-center 
          md:justify-start py-7 sm:pl-20 md:pl-40"
      >
        <h1
          className="text-sans text-[#1e4620] text-center md:text-left
            font-bold text-7xl sm:text-5xl md:text-5xl lg:text-6xl select-none"
        >
          Sobre Nosotros
        </h1>
      </div>
      <section className="w-full select-none pt-5 pb-20">
        <div className="flex flex-col md:flex-row gap-5">
          <div
            className=" flex-grow md:w-1/2 px-5 grid
            place-content-center place-items-center"
          >
            <AboutUsCard/>
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
    </>
  );
}

export default Nosotros;
