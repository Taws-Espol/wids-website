import Carrusel from "./Components/Carrusel";
import {Infos} from "./Components/Infos";
import Sponsors from "./Components/Sponsors";
import Cronograma from "./Components/Cronograma";
import Ubicacion from "./Components/Ubicacion";
import CarruselConferences from "./Components/CarruselConferences";
// <div className="flex place-content-center place-items-center">
// <Infos/>
// </div>
// <CarruselConferences/>,
// <Cronograma/>,
// <Ubicacion/>,
// <Sponsors/>

function Inicio() {
    return (
        <>
            <Carrusel/>
            <section className="select-none">
                <div className="mt-[3vw] mb-[10vw]" >
                    <div className="mt-5 max-md:mb-[2vw] md:mb-[3em]">
                        <h1 className="w-full text-center text-[6vw] md:text-[4vw] 2xl:text-[3vw] min-[2474px]:text-[2.25vw] font-sans font-bold" style={{color: '#004029'}}>
                            CONFERENCIA
                        </h1>
                    </div>
                    <div className="flex place-content-center place-items-center">
                        <Infos/>
                    </div>
                </div>
            </section>
            <Ubicacion/>,
            <div className="flex flex-col place-content-center place-items-center">
                <h1 className="font-bold text-5xl">
                    CRONOGRAMA
                </h1>
                <h2 className="w-full text-center text-[3.5vw] md:text-[2vw] 2xl:text-[1.5vw] min-[2474]:text-[1vw] font-mono p-5 font-semibold ">
                    09:00 am - 13:00 pm 
                </h2>
                <h2 className="w-full text-center text-[3.5vw] md:text-[2vw] 2xl:text-[1.5vw] min-[2474]:text-[1vw] font-mono p-5 font-semibold ">
                    {"MUY PRONTO !!"}
                </h2>
            </div>
            <Sponsors/>,
        </>
    );

}

export default Inicio;
