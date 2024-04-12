import { Carrusel } from "./Components/Carrusel";
import InfoCarrusel from "./Components/info-de-conferencia/Carrusel/Carrusel";
import Info from "./Components/info-de-conferencia/Info/Info";
import Sponsors from "./Components/Sponsors";
import Cronograma from "./Components/Cronograma";
import Ubicacion from "./Components/Ubicacion";

function Inicio() {
    return (
        <>
            <Carrusel/>
            <section>
                <div className="mt-[3vw] mb-[10vw]" >
                    <div className="mt-5 max-md:mb-[2vw] md:mb-[3em]">
                        <h1 className="w-full text-center text-[6vw] md:text-[4vw] 2xl:text-[3vw] min-[2474px]:text-[2.25vw] font-sans font-bold" style={{color: '#004029'}}>
                            CONFERENCIA
                        </h1>
                        <h2 className="w-full text-center text-[3vw] md:text-[2vw] 2xl:text-[1.5vw] min-[2474]:text-[1vw] font-mono p-5 font-semibold ">
                            13 de Julio, 2024 · Guayaquil - Espol
                        </h2>
                    </div>
                        <Info/>
                </div>
                <div className="pb-[5vw]" style={{color: 'white', backgroundColor: 'black'}}>
                    <h1 className="pt-6 md:pt-10 text-center text-[6vw] md:text-[4vw] 2xl:text-[3vw] min-[2474px]:text-[2.25vw] font-serif font-bold">
                        Conferencistas
                    </h1>
                    <InfoCarrusel/>
                </div>
            </section>
            <Cronograma/>,
            <Ubicacion/>,
            <Sponsors/>
        </>
    );

}

export default Inicio;
