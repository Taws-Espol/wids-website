import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import EditionCard from './Components/EditionCard';

function Editions() {
  const breakpoint = 1025;
  const checkSize = () => {
    if (window.innerWidth < breakpoint) {
      hiddenDiv();
    }
  };

  return (
    <>
      <section className="bg-gray-2 pb-20 pt-20 font-acumin">
        <div className="flex w-full flex-col place-content-center place-items-center">
          <div className="flex w-4/5 place-content-start place-items-center pb-40 max-md:pb-20">
            <h1 className="text-4xl font-bold text-primary-dark-green max-sm:text-2xl">
              Ediciones anteriores
            </h1>
          </div>
          <div className="">
            <div className="flex flex-wrap place-content-center place-items-center gap-16 max-2xl:mx-16">
              <Link to="/eventos/ediciones/2020">
                <EditionCard key="1" color="bg-green-edition" year="2020" />
              </Link>
              <Link to="/eventos/ediciones/2021">
                <EditionCard key="2" color="bg-red-edition" year="2021" />
              </Link>
              <Link to="/eventos/ediciones/2022">
                <EditionCard key="3" color="bg-blue-edition" year="2022" />
              </Link>
              <Link to="/eventos/ediciones/2023">
                <EditionCard key="4" color="bg-yellow-edition" year="2023" />
              </Link>
              <div className="h-[400px] w-[400px] max-xxl:h-[300px] max-xxl:w-[300px] max-lg:hidden"></div>
              <div className="h-[400px] w-[400px] max-xxl:h-[300px] max-xxl:w-[300px] max-lg:hidden"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Editions;
