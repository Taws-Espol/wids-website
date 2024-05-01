import Cards from "./Components/Cards";

function Conferencistas() {
    return (
        <div className="ml-[10vw] mr-[10vw] mb-[20vw]">
            <div className="flex items-center h-[20vw] md:h-[12vw]">
                <h1 className="font-bold text-[4vw] md:text-[2.5vw]">Edicion 2024</h1>
            </div>
            <div className="flex flex-wrap justify-start gap-[6vw]">
                {datos.map((dato) => {
                    return(
                        <div key={dato.id} className="max-md:mb-[6vw]">
                            <Cards name={dato.name} info={dato.info}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default Conferencistas;

//De prueba
const datos = [
    {
        id:1,
        name: 'Jose Luis Chong',
        info: 'Embajadora de los estados unidos de america defensora de los derechos humanos y gran aficionada de las carreras de formula 1',
        img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
    },
    {
        id:2,
        name: 'Ms. Roberta Patiño',
        info: 'Embajadora de los estados unidos de america defensora de los derechos humanos y gran aficionada de las carreras de formula 1',
        img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
    },
    {
        id:3,
        name: 'Maria Alberta',
        info: 'Embajadora de los estados unidos de america defensora de los derechos humanos y gran aficionada de las carreras de formula 1',
        img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
    },
    {
        id:4,
        name: 'Ana Garcia Mendoza',
        info: 'Embajadora de los estados unidos de america defensora de los derechos humanos y gran aficionada de las carreras de formula 1',
        img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
    },
    {
        id:5,
        name: 'Dolores Maldonado',
        info: 'Embajadora de los estados unidos de america defensora de los derechos humanos y gran aficionada de las carreras de formula 1',
        img:`src/assets/info-de-conferencia/Carrusel/prueba6.jpeg`
    }
];
