import React from 'react';
import Carrusel from "./Components/Carrusel";
import { Infos } from "./Components/Infos";
import Sponsors from "./Components/Sponsors";
import Ubicacion from "./Components/Ubicacion";
import CarruselConferences from "./Components/CarruselConferences";
import AnimatedSection from "./../../shared/AnimatedSection";

function Inicio() {
    return (
        <>
            <Carrusel />
            <AnimatedSection>
                <section className="select-none">
                    <div className="mt-[3vw] mb-[10vw]">
                        <div className="mt-5 max-md:mb-[2vw] md:mb-[3em]">
                            <h1 className="w-full text-center text-[6vw] md:text-[4vw] 2xl:text-[3vw] min-[2474px]:text-[2.25vw] font-acumin font-bold" style={{ color: '#004029' }}>
                                CONFERENCIA
                            </h1>
                        </div>
                        <div className="flex place-content-center place-items-center">
                            <Infos />
                        </div>
                    </div>
                </section>
            </AnimatedSection>
            <AnimatedSection>
                <div className='place-content-center place-items-center'>
                    <h1 className='font-bold text-center text-primary-dark-green text-[6vw] md:text-[4vw] 2xl:text-[3vw] min-[2474px]:text-[2.25vw] font-acumin'>UBICACIÓN</h1>
                    <Ubicacion />
                </div>

            </AnimatedSection>
            <AnimatedSection>
                <div className="flex flex-col place-content-center place-items-center select-none my-10">
                    <h1 className="font-bold text-5xl">
                        CRONOGRAMA
                    </h1>
                    <h2 className="w-full text-center text-[3.5vw] md:text-[2vw] 2xl:text-[1.5vw] min-[2474px]:text-[1vw] font-mono p-5 font-semibold ">
                        {"MUY PRONTO"}
                    </h2>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <img src="https://i.pinimg.com/originals/0f/5c/58/0f5c5833f72166b72193d12d81d56d5f.gif" alt="Animated GIF" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection>
                <CarruselConferences />
            </AnimatedSection>
            <AnimatedSection>
                <Sponsors />
            </AnimatedSection>
        </>
    );
}

export default Inicio;
