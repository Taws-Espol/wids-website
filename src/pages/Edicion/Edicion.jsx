import React from "react";
import { useLocation } from "react-router-dom";
import {EditionContainer}from "./Components/EditionContainer.jsx";
import { ediciones } from "../../data/ediciones";

function Edicion() {
	const location = useLocation();
	const year = location.pathname.split("/").pop();
	const edicionData = ediciones.find((edicion) => edicion.edicion === year);

	return (
		<>
			<section className='select-none dark:bg-dark  my-2 mx-10 px-20 py-10 border-t-[6px] border-t-primary-blue max-md:flex max-md:flex-col max-md:place-content-center max-md:place-items-center'>
				<h1 className="text-primary-dark-green text-3xl font-bold font-acumin max-md:text-2xl my-5">Edición {year}</h1>
				<div className='flex place-content-center flex-col place-items-center'>
					<EditionContainer edicionData={edicionData} />
				</div>
			</section>
		</>
	);
}

export default Edicion;
