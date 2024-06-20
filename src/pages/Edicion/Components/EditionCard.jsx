function EditionCard({color,year}) {

    const imgYear  = {
        2020 : "/assets/images-carrusel/MujeresComputadoras.jpg",
        2021 : "/assets/images-carrusel/MujeresUnaCoputadora.jpg",
        2022 : "/assets/images-carrusel/Conferencistas.jpg",
        2023 : "/assets/images-carrusel/MujeresComputadora.jpg",
    }
    return (
        <div className={`relative w-[400px] h-[400px] overflow-hidden rounded-3xl flex flex-col items-start max-xxl:h-[300px] max-xxl:w-[300px] select-none bg-center bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${imgYear[year]})` }}>
            <div className={`absolute bottom-[-50px] right-[-40px] w-[300px] h-[300px] rounded-full max-xxl:h-[200px] max-xxl:w-[200px] ${color}`}>
                    <p className='mt-10 text-white text-8xl text-center font-bold'>{year.slice(0,2)}</p>
                    <p className='text-white text-8xl text-center font-bold'>{year.slice(2)}</p>
            </div>
        </div>
    )
}
export default EditionCard;

