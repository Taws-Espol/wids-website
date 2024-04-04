import {Carrusel} from "./Components/Carrusel";
import InfoCarrusel from './Components/info-de-conferencia/Carrusel/Carrusel';
import Info from './Components/info-de-conferencia/Info/Info'
import Sponsors from "./Components/Sponsors";
import Cronograma from "./Components/Cronograma";
import Ubicacion from "./Components/Ubicacion";


function Inicio() {
    return (
        <>
            <Carrusel/>
            <section>
                <div className="h-screen" >
                    <div className="h-96">
                        <h1 className="w-full text-center text-[5rem] font-sans font-bold" style={{color: '#004029'}}>
                            CONFERENCIA
                        </h1>
                        <h2 className="w-full text-center text-3xl font-mono p-5 font-semibold ">
                            13 de Julio, 2024 · Guayaquil - Espol
                        </h2>
                    </div>
                    <Info/>
                </div>
                <div className="h-screen" style={{color: 'white', backgroundColor: 'black'}}>
                    <h1 className="p-10 text-center text-[5rem] font-serif font-bold">
                        Conferencistas
                    </h1>
                    <InfoCarrusel/>
                </div>
            </section>
            <Sponsors></Sponsors>,
            <Cronograma/>,
            <Ubicacion/>
        </>
    );

}

export default Inicio;
