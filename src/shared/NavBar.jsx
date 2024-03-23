import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/conferencistas">Conferencistas</Link></li>
        <li><Link to="/cronograma">Cronograma</Link></li>
        <li><Link to="/eventos">Eventos</Link></li>
        <ul>
          <li><Link to="/eventos">Wids</Link></li>
          <li><Link to="/eventos">Datathon</Link></li>
        </ul>
        <li><Link to="/nosotros">Nosotros</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
