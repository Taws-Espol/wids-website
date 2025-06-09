import React from 'react';
import { useLocation } from 'react-router-dom';
import { EditionContainer } from './Components/EditionContainer.jsx';
import { ediciones } from '../../data/ediciones.js';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

function Edition() {
  const location = useLocation();
  const year = location.pathname.split('/').pop();
  const edicionData = ediciones.find((edicion) => edicion.edicion === year);
  return (
    <>
      <section className="dark:bg-dark m-0 mx-10 my-2 select-none px-20 py-10 max-md:flex max-md:flex-col max-md:place-content-center max-md:place-items-center max-md:p-0">
        <div className="flex w-full items-center gap-2 text-center">
          <Link to="/eventos/ediciones">
            <h1 className="my-5 font-acumin text-4xl font-bold text-primary-dark-green max-md:text-2xl max-sm:text-lg">
              {'Ediciones anteriores  > '}{' '}
            </h1>
          </Link>
          <h1 className="my-5 font-acumin text-4xl font-bold text-primary-dark-green max-md:text-2xl max-sm:text-lg">
            Edición {year}
          </h1>
        </div>
        <div className="flex flex-col place-content-center place-items-center pt-20 max-md:pt-10">
          <EditionContainer edicionData={edicionData} />
        </div>
      </section>
    </>
  );
}

export default Edition;
