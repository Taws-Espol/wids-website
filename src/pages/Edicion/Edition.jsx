import React from "react";
import { useLocation } from "react-router-dom";
import { EditionContainer } from "./Components/EditionContainer.jsx";
import { ediciones } from "../../data/ediciones.js";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom

function Edition() {
  const location = useLocation();
  const year = location.pathname.split("/").pop();
  const edicionData = ediciones.find((edicion) => edicion.edicion === year);
  return (
    <>
      <section className="select-none dark:bg-dark  my-2 mx-10 px-20 py-10 max-md:flex max-md:flex-col max-md:place-content-center max-md:place-items-center max-md:p-0 m-0">
        <div className="flex gap-2 text-center items-center w-full">
          <Link to="/eventos/ediciones">
            <h1 className="text-primary-dark-green text-4xl font-bold font-acumin max-md:text-2xl max-sm:text-lg my-5">
              {"Ediciones anteriores  > "}{" "}
            </h1>
          </Link>
          <h1 className="text-primary-dark-green text-4xl font-bold font-acumin max-md:text-2xl  max-sm:text-lg my-5">
            Edición {year}
          </h1>
        </div>
        <div className="flex place-content-center flex-col place-items-center pt-20 max-md:pt-10">
          <EditionContainer edicionData={edicionData} />
        </div>
      </section>
    </>
  );
}

export default Edition;
