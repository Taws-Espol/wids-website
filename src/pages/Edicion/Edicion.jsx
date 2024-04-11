import { useLocation } from "react-router-dom";

function Edicion() {
	const location = useLocation();
	const year = location.pathname.split("/").pop(); // Obtén el año de la edición de la URL

	return (
		<>
			<section className='bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
				<h1>Edicion {year}</h1> {/* Muestra el año de la edición */}
				<div className='container'></div>
			</section>
		</>
	);
}

export default Edicion;
