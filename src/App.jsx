import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';

import Inicio from './pages/Home/Inicio';
import Navbar from './shared/NavBar';
import Footer from './shared/Footer';
import Conferencistas from './pages/Conferencistas/Conferencistas';
import Cronograma from './pages/Cronograma/Cronograma';
import Eventos from './pages/Eventos/Eventos';
import Nosotros from './pages/Nosotros/Nosotros';
import ButtonUp from './shared/ButtonUp';

function App() {

  function NotFound() {
    return <div>404 Not Found</div>;
  }

  return (
    <>
      <Router>
        <Navbar/>
        <div className='-z-1000'>
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route path="/conferencistas" element={<Conferencistas />} />
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
        <ButtonUp className="" />
        <Footer />
    
      </Router>
      
    </>
  )
}

export default App;
