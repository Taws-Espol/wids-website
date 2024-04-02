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
                <div>
                    <h1 className="w-full text-center text-3xl font-sans font-bold" style={{color: '#004029'}}>
                        Conferencia
                    </h1>
                    <h2 className="w-full text-center text-xl font-mono p-5 font-semibold ">
                        13 de Julio, 2024 · Guayaquil - Espol
                    </h2>
                    <Info/>
                </div>
                <div className='mt-14' style={{color: 'white', backgroundColor: 'black'}}>
                    <h1 className="p-10 text-center text-3xl font-serif font-bold">
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
