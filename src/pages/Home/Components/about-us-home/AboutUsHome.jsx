const AboutUsHome = () => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center px-5 py-5 lg:flex-row lg:space-x-5">
      <div className="lg:w-1/2">
        <div className="flex flex-col space-y-5 lg:space-y-10">
          <h1 className="text-[5vw] md:text-[3vw] lg:text-[2.5vw] 5xl:text-[3.8em]">
            Empoderando a las Mujeres en Ciencia de Datos: Una Fuente de
            Inspiración
          </h1>
          <p className="mt-[2vw] text-[3vw] md:text-[2vw] lg:text-[1.5vw] lg:text-xl 5xl:mt-10 5xl:text-[2.2em]">
            WiDS Guayaquil@ESPOL busca visibilizar y celebrar el impacto de las
            mujeres en la ciencia de datos, creando un espacio para compartir
            conocimientos, experiencias y motivar a nuevas generaciones. A
            través de charlas, talleres y redes de apoyo, impulsamos la
            participación femenina en un campo clave para el futuro.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-4 lg:w-1/2">
        <img
          src="/assets/images/collage-about-us.png"
          alt="collage"
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AboutUsHome;
