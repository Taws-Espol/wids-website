import AnimatedSection from "../../../../shared/AnimatedSection";

export default function Hero({ title, link }) {
  return (
    <AnimatedSection>
      <div
        className="relative flex flex-col md:flex-row md:justify-between
        justify-center items-center place-i md:items-start  bg-yellow-500 text-primary-dark-green
         pb-10 overflow-hidden"
      >
        <div className="w-4/5 md:w-1/2 flex flex-col justify-items-center justify-center py-10 md:p-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            2xl:text-[80px]  text-center md:text-start  font-bold pb-10"
          >
            {title}
          </h2>
          <div
            className="flex flex-row max-md:flex-col place-content-center w-full 
            text-2xl gap-10 px-20 max-md:m-0  max-sm:gap-5
            max-md:gap-10 max-sm:text-lg max-md:text-xl justify-center
            items-center lg:pl-56"
          >
            <button
              className="text-white bg-green-900 whitespace-nowrap select-none
                rounded-3xl px-20 py-5 text-center font-acumin font-medium
                max-md:text-lg max-md:px-4 text-3xl"
              onClick={() => window.open(link, "_blank")}
            >
              Registrate aquí
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/assets/Eventos/Datathon/data_portada.webp"
            alt="Event logo"
            className=" md:absolute md:right-[-55%] md:top-0 w-full
            max-w-[80%] sm:max-w-[70%] md:max-w-full max-h-[80%] sm:max-h-[70%]
            md:max-h-full h-auto md:object-cover shadow-xl md:shadow-2xl
            rounded-full py-2"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
