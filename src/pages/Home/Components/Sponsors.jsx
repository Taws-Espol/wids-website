import { Sponsors_Cola } from "../../../data/sponsors";
import Sponsor from "./Sponsor";
import Club from "./Club";
import Subtitle from "./Subtitle";
import AnimatedSection from "./../../../shared/AnimatedSection";
export default function Sponsors() {
  const google = Sponsors_Cola.importants[0];

  return (
    <div
      className={`flex flex-col items-center place-content-center 
		place-items-center select-none mt-16 font-acumin mb-20 text-primary-dark-green`}
    >
      <AnimatedSection>
        <div className="flex flex-col place-items-center place-content-center mb-20 gap-10">
          <p className="text-4xl font-bold">ORGANIZADOR</p>
          <a href={"https://www.instagram.com/taws_espol"} className="">
            <img
              src="/assets/taws.webp"
              alt="Taws"
              width={230}
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            />
          </a>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="flex flex-col place-content-center place-items-center mb-20">
          <p className="text-4xl font-bold">SPONSORS</p>

          <div className="flex gap-10  mt-10 max-sm:flex-col sm:flex-wrap place-content-center place-items-center ">
            <a
              href={google.website}
              className="text-pink-500 w-full h-full flex justify-center items-center"
            >
              <img
                src={google.logo}
                alt={google.name}
                className="w-3/5 h-2/5 transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110"
              />
            </a>
          </div>
          <div className="flex gap-10  mt-10 max-sm:flex-col sm:flex-wrap place-content-center place-items-center ">
            {Sponsors_Cola.sponsors.map((sponsor, index) => (
              <Sponsor key={index} {...sponsor} />
            ))}
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="flex flex-col place-content-center place-items-center">
          <p className="text-4xl font-bold">CLUBES ASOCIADOS</p>
          <div className="flex gap-10  mt-10 max-sm:flex-col sm:flex-wrap place-content-center place-items-center ">
            {Sponsors_Cola.colaboradores.map((sponsor, index) => (
              <Club key={index} {...sponsor} />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
