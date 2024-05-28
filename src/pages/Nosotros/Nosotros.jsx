function Nosotros() {
  return (
    <>
      <div className="pb-5 pt-5 mt-4 sm:pb-8 sm:pt-8 md:pb-10 md:pt-10 flex
      items-center justify-center bg-gradient-to-r from-yellow-500 to-amber-400">
        <h1 className="text-xl sm:text-4xl md:text-5xl  lg:text-6xl text-sans text-slate-100">
          Sobre Nosotros
        </h1>
      </div>
      <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <section
        className="bg-gray-2 dark:bg-dark
        flex place-content-center place-items-center select-none font-acumin"
      >
        <div
          className="container flex py-20 px-10
        place-content-center place-items-center max-lg:flex-col max-lg:gap-10"
        >
          <div className="w-3/5 flex place-content-center place-items-center ">
            <img
              src="/src/assets/navbar/Logo_wids2024.png"
              alt="Imagen de evento"
              className="w-[300px] h-2/4 md:w-[500px]"
            />
          </div>
          <div className="w-2/5 max-sm:min-w-[300px] max-md:min-w-[500px] max-lg:min-w-[700px]">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-sans">
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
