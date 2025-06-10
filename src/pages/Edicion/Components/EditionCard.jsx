function EditionCard({ color, year }) {
  const imgYear = {
    2020: '/assets/images-carrusel/MujeresComputadoras.webp',
    2021: '/assets/images-carrusel/MujeresUnaCoputadora.webp',
    2022: '/assets/images-carrusel/Conferencistas.webp',
    2023: '/assets/images-carrusel/MujeresComputadora.webp',
  };
  return (
    <div
      className={`relative flex h-[400px] w-[400px] select-none flex-col items-start overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat max-xxl:h-[300px] max-xxl:w-[300px]`}
      style={{ backgroundImage: `url(${imgYear[year]})` }}
    >
      <div
        className={`absolute bottom-[-50px] right-[-40px] h-[300px] w-[300px] rounded-full max-xxl:h-[200px] max-xxl:w-[200px] ${color}`}
      >
        <p className="mt-10 text-center text-8xl font-bold text-white max-2xl:mt-5 max-xxl:text-6xl">
          {year.slice(0, 2)}
        </p>
        <p className="text-center text-8xl font-bold text-white max-xxl:text-6xl">
          {year.slice(2)}
        </p>
      </div>
    </div>
  );
}
export default EditionCard;
