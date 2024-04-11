import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";

import Inicio from "./pages/Home/Inicio";
import Navbar from "./shared/NavBar";
import Footer from "./shared/Footer";
import Conferencistas from "./pages/Conferencistas/Conferencistas";
import Cronograma from "./pages/Cronograma/Cronograma";
import Eventos from "./pages/Eventos/Eventos";
import Nosotros from "./pages/Nosotros/Nosotros";
import Ediciones from "./pages/Eventos/Eventos";
import Edicion from "./pages/Edicion/Edicion";
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
					<Route path='/eventos' element={<Eventos />} />
					<Route path='/ediciones' element={<Ediciones />} />
					{/*TODO: Add the component!!! */}
					<Route path='/ediciones/2020' element={<Edicion />} />
					<Route path='/ediciones/2021' element={<Edicion />} />
					<Route path='/ediciones/2022' element={<Edicion />} />
					<Route path='/ediciones/2023' element={<Edicion />} />
					<Route path='/nosotros' element={<Nosotros />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
        </div>
				<Footer />
			</Router>
		</>
	);
}

export default App;
