import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const toggle1 = () => {
    setIsOpen1(!isOpen1);
  };
  return (
    <nav className='fixed top-0 left-0 w-full xl:bg-[rgb(255,255,255)] xl:flex xl:items-center xl:justify-between xl:text-[20px] xl:text-lg font-acumin leading-3 text-base'>
      <div className='flex items-center justify-between'>
        <Link to="/">
          <img className='xl:w-full w-40 ' src="/src/assets/navbar/Imagen de WhatsApp 2024-03-25 a las 21.16.47_83686aab.jpg" alt="" />
        </Link> 
        <div className='xl:hidden rounded-md w-6  items-center mx-6 hover:bg-gray-100 ' onClick={toggle}>
          <span className={`block w-full h-1 rounded bg-black transition-transform duration-300 ${isOpen ? 'transform rotate-45 translate-y-1.5 -translate-x-0' : 'mt-1'}`}></span>
          <span className={`block w-full h-1 rounded bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : 'mt-1'}`}></span>
          <span className={`block w-full h-1 rounded bg-black transition-transform duration-300 ${isOpen ? 'transform -rotate-45 -translate-y-0.5 -translate-x-0' : 'mt-1'}`}></span>
      </div>
      </div>
      <ul className={`xl:flex xl:l-0  xl:bg-none bg-gradient-custom p-4 xl:translate-x-0 ${isOpen ? "translate-x-0 transition-transform duration-300 ease-in-out" : "translate-x-full transition-transform duration-300 ease-in-out"}`}>
        <li><Link to="/" className='xl:px-8 xl:py-8 xl:text-[20px] xl:text-black gradient-text-hover gradient-underline-hover block  text-center  pt-4 pb-4 text-[25px] text-white'>Inicio</Link></li>
        <li><Link to="/conferencistas" className='xl:px-8  xl:py-8 xl:text-[20px] xl:text-black gradient-text-hover  gradient-underline-hover block text-center  pt-4 pb-4 text-[25px] text-white' >Conferencistas</Link></li>
        <li><Link to="/cronograma" className='xl:px-8  xl:py-8 xl:text-[20px] xl:text-black gradient-text-hover relative  gradient-underline-hover block  text-center  pt-4 pb-4 text-[25px] text-white'>Cronograma</Link></li>
        <li className='xl:relative'><Link to="/eventos" className='xl:px-8 xl:py-8 xl:text-[20px] xl:text-black gradient-text-hover gradient-underline-hover block text-center pt-4 pb-4 text-[25px] text-white' >Eventos<span   onClick={toggle1} >⮟</span></Link>
          {isOpen1 && (
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

