import React from "react";
import Carrusel from "./Components/Carrusel";
import { Infos } from "./Components/Infos";
import Sponsors from "./Components/Sponsors";
import Ubicacion from "./Components/Ubicacion";
import CarruselConferences from "./Components/CarruselConferences";
import AnimatedSection from "./../../shared/AnimatedSection";
import Posts from "./Components/Posts";
import Programa from "./Components/Programa";
import AboutUsHome from "./Components/about-us-home/AboutUsHome";

function Inicio() {
  return (
    <>
      <Carrusel />
      <AnimatedSection>
        <section className="select-none">
          <div className="mt-[3vw] mb-20">
            <div className="mt-5 max-md:mb-[2vw] md:mb-[3em]">
              <h1
                className="w-full text-center text-[6vw] md:text-[5vw] 2xl:text-[4vw] min-[2474px]:text-[3vw] font-acumin font-bold"
                style={{ color: "#004029" }}
              >
                CONFERENCIA
              </h1>
            </div>
            <AnimatedSection>
              <div className="flex place-content-center place-items-center">
                <Infos />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>
      <AnimatedSection>
        <Ubicacion />
      </AnimatedSection>
      <AboutUsHome />
      <AnimatedSection>
        <div className="flex flex-col place-content-center place-items-center select-none my-10 font-acumin text-primary-dark-green">
          <h1 className="font-bold text-5xl">PROGRAMA</h1>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Programa />
          </div>
        </div>
      </AnimatedSection>
      <div className="w-full bg-primary-dark-green h-20"></div>
      <AnimatedSection>
        <Sponsors />
      </AnimatedSection>
    </>
  );
}

export default Inicio;
