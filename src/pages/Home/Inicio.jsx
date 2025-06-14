import React from 'react';
import Carrusel from './Components/Carrusel';
import { Infos } from './Components/Infos';
import Sponsors from './Components/Sponsors';
import Ubicacion from './Components/Ubicacion';
import CarruselConferences from './Components/CarruselConferences';
import AnimatedSection from './../../shared/AnimatedSection';
import Posts from './Components/Posts';
import Programa from './Components/Programa';
import AboutUs from './Components/AboutUs';

function Inicio() {
  return (
    <>
      <Carrusel />
      <AnimatedSection>
        <section className="select-none">
          <div className="mb-20 mt-[3vw]">
            <div className="mt-5 max-md:mb-[2vw] md:mb-[3em]">
              <h1
                className="font-acumin w-full text-center text-[6vw] font-bold md:text-[5vw] 2xl:text-[4vw] min-[2474px]:text-[3vw]"
                style={{ color: '#004029' }}
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
        <AboutUs />
      </AnimatedSection>
      <AnimatedSection>
        <Ubicacion />
      </AnimatedSection>
      <AnimatedSection>
        <div className="font-acumin my-10 flex select-none flex-col place-content-center place-items-center text-primary-dark-green">
          <h1 className="text-5xl font-bold">PROGRAMA</h1>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Programa />
          </div>
        </div>
      </AnimatedSection>
      <div className="h-20 w-full bg-primary-dark-green"></div>
      <AnimatedSection>
        <Sponsors />
      </AnimatedSection>
    </>
  );
}

export default Inicio;
