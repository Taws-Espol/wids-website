import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className='w-full xl:bg-[rgb(255,255,255)] xl:flex xl:items-center xl:justify-between xl:text-[20px] xl:text-lg font-acumin leading-3 text-base ]'>
      <div className='flex items-center justify-between' >
        <Link to="/">
          <img className='xl:w-full w-40 ' src="/src/assets/navbar/Imagen de WhatsApp 2024-03-25 a las 21.16.47_83686aab.jpg" alt="" />
        </Link>
        <div className='xl:hidden px-4'>barrita</div>
      </div>
      <ul className='xl:flex xl:bg-[rgb(255,255,255)] bg-[rgb(226,83,83)] p-4'>
        <li><Link to="/" className='xl:px-8 xl:py-8 xl:text-[20px] xl:text-black gradient-text-hover gradient-underline-hover block  text-center  pt-4 pb-4 text-[25px] text-white'>Inicio</Link></li>
        <li><Link to="/conferencistas" className='xl:px-8  xl:py-8 xl:text-[20px] xl:text-black gradient-text-hover  gradient-underline-hover block text-center  pt-4 pb-4 text-[25px] text-white' >Conferencistas</Link></li>
        <li><Link to="/cronograma" className='xl:px-8  xl:py-8 xl:text-[20px] xl:text-black gradient-text-hover relative  gradient-underline-hover block  text-center  pt-4 pb-4 text-[25px] text-white'>Cronograma</Link></li>
        <li className='xl:relative'><Link to="/eventos" className='xl:px-8 xl:py-8 xl:text-[20px] xl:text-black gradient-text-hover gradient-underline-hover block text-center pt-4 pb-4 text-[25px] text-white' >Eventos<span onClick={toggleDropdown} >⮟</span></Link>
          {isDropdownVisible && (
            <ul className='xl:absolute xl:left-0 bg-white  xl:shadow-lg  text-center'>
              <li className=' link-with-gradient-border'><Link to="/eventos/wids" className='block xl:px-8 xl:py-2 xl:text-[20px] hover:bg-gray-100 pt-4 pb-4 text-[25px]'>Wids</Link></li>
              <li className=' link-with-gradient-border'><Link to="/eventos/datathon" className='block xl:px-8 xl:py-2 xl:text-[20px] hover:bg-gray-100 pt-4 pb-4 text-[25px]'>Datathon</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/nosotros" className='xl:px-10 xl:py-8 xl:text-[20px] xl:text-black xl:relative gradient-text-hover gradient-underline-hover block text-center pt-4 pb-4 text-[25px] text-white' >Nosotros</Link></li>
      </ul>
      
    </nav>
  );
}

export default Navbar;

