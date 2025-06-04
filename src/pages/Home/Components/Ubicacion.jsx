import { MdLocationPin } from "react-icons/md";
const Ubicacion = () => {
  return (
    <div className="md:pb-3 pb-[10vw] pt-[3.5vw] md:pl-3 md:pt-3 bg-neutral-grey bg-opacity-20 text-primary-dark-green flex flex-col md:flex-row items-center select-none !w-full">
      <div className="flex w-full md:!w-3/4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.026445702663!2d-79.96903302423073!3d-2.1435536371656436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d7302f96af647%3A0x5a1dd75c545cedd!2sSTEM%20(Edificio%20de%20Posgrados)!5e0!3m2!1ses-419!2sec!4v1718137962522!5m2!1ses-419!2sec"
          width="800"
          height="600"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="max-md:mx-5 md:!w-full h-[500px] shadow-md rounded-lg"
        ></iframe>
      </div>
      <div className="pr-[1vw] min-[1651px]:pl-[1.2vw] 5xl:pl-[2vw] flex flex-col">
        <div className="flex flex-col place-items-center md:place-items-start  font-acumin px-8 pt-[10vw] md:pt-12 ">
          <h1 className="text-[7vw] md:text-[4vw] lg:text-[3.5vw] 5xl:text-[5em] font-acumin font-bold">
            UBICACIÓN
          </h1>
          <div className="flex place-items-center text-center gap-3 lg:gap-5">
            <MdLocationPin className="w-[5vw] md:w-[3vw] lg:w-[2.5vw] 5xl:w-[3.8em] h-fit md:h-16 mt-[3vw] md:mt-4 " />
            <h2 className="mt-[3vw] text-[5vw] md:mt-4 md:text-[3vw] lg:text-[2.5vw] 5xl:text-[3.8em]">
              Edificio STEM
            </h2>
          </div>
          <div className="flex flex-col max-md:place-items-center max-md:mr-[1vw]">
            <h2 className="text-[3vw] mt-[2vw] 5xl:mt-10 md:text-[2vw] lg:text-[1.5vw] 5xl:text-[2.2em] ml-3">
              Campus Gustavo Galindo
            </h2>
            <h2 className="text-[3vw] mt-2 lg:text-[1.5vw] 5xl:text-[2.2em] md:text-[2vw]  ml-3">
              Km. 30 vía Perimetral
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ubicacion;
