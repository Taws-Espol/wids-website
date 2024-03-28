import Carrusel from './components/info-de-conferencia/Carrusel/Carrusel';
import Info from './components/info-de-conferencia/Info/Info'

function Inicio() {
    return (
        <section>
            <div>
                <h1 className="w-full text-center text-3xl font-sans font-bold" style={{color: '#004029'}}>
                    Conferencia
                </h1>o
                <h2 className="w-full text-center text-xl font-mono p-5 font-semibold ">
                    13 de Julio, 2024 · Guayaquil - Espol
                </h2>
                <Info/>
            </div>
            <div className='mt-20' style={{color: 'white', backgroundColor: 'black',}}>
                <h1 className="text-center text-2xl font-serif font-bold">
                    Conferencistas
                </h1>
                <Carrusel/>
            </div>
        </section>
    );
}

export default Inicio;
