import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";

import Inicio from "./pages/Home/Inicio";
import Navbar from "./shared/NavBar";
import Footer from "./shared/Footer";
import Conferencistas from "./pages/Conferencistas/Conferencistas";
import Cronograma from "./pages/Cronograma/Cronograma";
import Nosotros from "./pages/Nosotros/Nosotros";
import Editions from "./pages/Edicion/Editions";
import Edition from "./pages/Edicion/Edition";
import ButtonUp from "./shared/ButtonUp";
import Datathon from "./pages/Eventos/Datathon";
import NextGen from "./pages/Eventos/NextGen";
function App() {
	function NotFound() {
		return <div>404 Not Found</div>;
	}

	return (
		<>
			<Router>
				<Navbar />
        <div className='-z-1000'>
				<Routes>
					<Route exact path='/' element={<Inicio />} />
					<Route path='/conferencistas' element={<Conferencistas />} />
					<Route path='/cronograma' element={<Cronograma />} />
					{/*TODO: Events */}
					<Route path='/eventos/datathon' element={<Datathon />} />
					<Route path='/eventos/nextgen' element={<NextGen />} />
					<Route path='/eventos/ediciones' element={<Editions />} />
					{/*TODO: Add the component!!! */}
					<Route path='/eventos/ediciones/2020' element={<Edition />} />
					<Route path='/eventos/ediciones/2021' element={<Edition />} />
					<Route path='/eventos/ediciones/2022' element={<Edition />} />
					<Route path='/eventos/ediciones/2023' element={<Edition />} />
					<Route path='/nosotros' element={<Nosotros />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
        </div>
				<Footer />
				<ButtonUp />
			</Router>
		</>
	);
}

export default App;
