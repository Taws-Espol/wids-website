import React from "react";
import { useLocation } from "react-router-dom";
import AccordionContainer from "../Home/Components/AccordionContainer";
import { ediciones } from "../../data/ediciones";

function Edicion() {
	const location = useLocation();
	const year = location.pathname.split("/").pop();
	const edicionData = ediciones.find((edicion) => edicion.edicion === year);

	return (
		<>
			<section className='bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
				<h1>Edicion {year}</h1>
				<div className='container'>
					<AccordionContainer edicionData={edicionData} />
				</div>
			</section>
		</>
	);
}

export default Edicion;
