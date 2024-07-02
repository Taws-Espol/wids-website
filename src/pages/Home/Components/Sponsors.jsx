import { Sponsors_Cola } from "../../../data/sponsors";
import Sponsor from "./Sponsor";
import Subtitle from "./Subtitle";
import AnimatedSection from "./../../../shared/AnimatedSection";
export default function Sponsors() {
  return (
    <div
      className={`flex flex-col items-center place-content-center 
		place-items-center select-none mt-32 font-acumin mb-20`}
    >
      <AnimatedSection>
        <div className="flex w-full mb-20">
          <div className="flex !w-full max-xl:flex-col xl:flex-wrap xl:gap-40  xl:ml-36 max-xl:gap-20">
            <div className="flex flex-col gap-10 place-content-center place-items-center !w2/5">
              <p className="text-4xl font-bold">ORGANIZADOR</p>
              <div className="">
                <img
                  src="/assets/taws.webp"
                  alt="Taws"
                  width={230}
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col place-items-center !w2/5">
              <p className="text-4xl font-bold pb-10">COLABORADORES</p>
              <div className="flex flex-col gap-10">
                {Sponsors_Cola.colaboradores.map((colaborador, index) => (
                  <Sponsor key={index} {...colaborador} />
                ))}
              </div>
              {}
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <p className="text-4xl font-bold">SPONSORS</p>
      </AnimatedSection>
      <div className="flex gap-10  mt-10 max-sm:flex-col sm:flex-wrap place-content-center place-items-center ">
        {Sponsors_Cola.sponsors.map((sponsor, index) => (
          <Sponsor key={index} {...sponsor} />
        ))}
      </div>
    </div>
  );
}
