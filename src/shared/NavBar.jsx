import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isEventHovered, setIsEventHovered] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const toggle1 = () => {
    setIsOpen1(!isOpen1);
  };
  const handleEventHover = () => {
    setIsEventHovered(true);
    const arrowIcon = document.getElementById('arrow-icon');
    arrowIcon.classList.add('gradient-text');
  };
  const handleEventHoverOut = () => {
    setIsEventHovered(false);
    const arrowIcon = document.getElementById('arrow-icon');
    arrowIcon.classList.remove('gradient-text');
  };
  return (
    <nav className={` z-50 
                      xl:flex 
                      xl:items-center 
                      xl:justify-between 
                      xl:text-[20px] 
                      xl:text-lg fixed 
                      top-0 left-0 
                      w-full 
                      font-acumin 
                      leading-3 
                      text-base `}>
      <div className='flex 
                      items-center 
                      bg-[rgb(255,255,255)] 
                      justify-between'>
        <Link to="/">
          <img  className='xl:w-full w-40 ' 
                src="/src/assets/navbar/Imagen de WhatsApp 2024-03-25 a las 21.16.47_83686aab.jpg" 
                alt="" />
        </Link> 
        <div  className=' xl:hidden 
                          rounded-md 
                          w-6  
                          items-center 
                          mx-6 
                          hover:bg-gray-100 ' 
              onClick={toggle}>
          <span className={`block 
                            w-full h-1 
                            rounded 
                            bg-black 
                            transition-transform duration-300 
                            ${isOpen ? 'transform rotate-45 translate-y-1.5 -translate-x-0' : 'mt-1'}`}>
          </span>
          <span className={`block 
                            w-full h-1 
                            rounded 
                            bg-black 
                            transition-all duration-300 
                            ${isOpen ? 'opacity-0' : 'mt-1'}`}>
          </span>
          <span className={`block 
                            w-full h-1 
                            rounded 
                            bg-black 
                            transition-transform duration-300 
                            ${isOpen ? 'transform -rotate-45 -translate-y-0.5 -translate-x-0' : 'mt-1'}`}>
          </span>
        </div>
      </div>
      <ul className={`z-50 
                      xl:flex 
                      xl:l-0 
                      xl:bg-none 
                      p-4 
                      xl:translate-x-0 
                      bg-gradient-custom 
                      ${isOpen ? "translate-x-0 transition-transform duration-300 ease-in-out" : "translate-x-full transition-transform duration-300 ease-in-out"}`}>
        <li className=' xl:border-0 border-2 
                        xl:font-thin font-black 
                        xl:shadow-none shadow-lg  
                        xl:mb-0 mb-1'>
          <Link to="/" 
                className=' xl:px-8 xl:py-8 
                            xl:text-[20px] text-[25px] 
                            xl:text-black text-white  
                            gradient-text-hover gradient-underline-hover
                            block  
                            text-center text-stroke  
                            pt-6 pb-6'>
            Inicio
          </Link>
        </li>
        <li className=' xl:border-0 border-2
                        xl:font-thin font-black
                        xl:shadow-none shadow-lg 
                        mb-1'>
          <Link to="/cronograma" 
                className=' xl:px-8 xl:py-8 
                            xl:text-[20px] text-[25px]
                            xl:text-black text-white 
                            gradient-text-hover gradient-underline-hover
                            relative
                            block  
                            text-center  
                            pt-6 pb-6'>
            Conferencistas
          </Link>
        </li>
        <li className=' xl:border-0 border-2
                        xl:font-thin font-black
                        xl:shadow-none shadow-lg
                        mb-1 relative'>
          <Link to="/cronograma" 
                className='xl:px-8 xl:py-8 
                          xl:text-[20px] text-[25px]
                          xl:text-black text-white
                          gradient-text-hover gradient-underline-hover 
                          relative
                          block  
                          text-center  
                          pt-6 pb-6'>
            Cronograma
          </Link>
        </li>
        <li className=' xl:relative
                        xl:border-0 border-2
                        xl:font-thin font-black
                        xl:shadow-none shadow-lg   
                        xl:flex 
                        justify-center 
                        items-center
                        mb-1'>
          <div className='flex 
          justify-center 
          items-center'>
            <Link onMouseEnter={handleEventHover} 
                  onMouseLeave={handleEventHoverOut}  
                  to="/eventos" 
                  className=' xl:px-8 xl:py-8 
                              xl:text-[20px] text-[25px]
                              xl:text-black text-white
                              gradient-text-hover gradient-underline-hover 
                              text-center 
                              pt-6 pb-6   
                              flex 
                              justify-center 
                              items-center' 
                  id="event-section">
              Eventos
            </Link>
            <p  onMouseEnter={handleEventHover} 
                onMouseLeave={handleEventHoverOut} 
                id="arrow-icon" 
                className={`cursor-pointer 
                            xl:right-2 
                            xl:absolute 
                            xl:text-center
                            xl:py-8 
                            xl:text-[20px] text-[25px]
                            xl:text-black text-white
                            pt-6 pb-6   
                            flex 
                            justify-center 
                            items-center 
                            ${isOpen1 ? "rotate-180 transition-transform duration-300 ease-in-out" : "rotate-0 transition-transform duration-300 ease-in-out"} `} 
                onClick={toggle1}>
              ⮟
            </p>
          </div>
          <ul className={`xl:absolute 
                          xl:left-0 
                          xl:top-full 
                          xl:-mt-6 
                          bg-white 
                          xl:shadow-lg 
                          text-center 
                          dropdown-menu 
                          ${isOpen1 ? 'show' : ''}`}>
            <li className='link-with-gradient-border '>
              <Link to="/eventos/wids" 
                    className=' gradient-border-bottom 
                                xl:px-8 xl:py-2 
                                xl:text-[20px] text-[25px]
                                block  
                                hover:bg-gray-100 
                                pt-5 pb-5'>
                Wids
                </Link>
            </li>
            <li className='link-with-gradient-border '>
              <Link to="/eventos/datathon" 
                    className=' xl:px-8 xl:py-2 
                                xl:text-[20px] text-[25px] 
                                block  
                                hover:bg-gray-100 
                                pt-5 pb-5'>
                Datathon
              </Link>
            </li>
          </ul>
        </li>
        <li className=' xl:border-0 border-2
                        xl:font-thin font-black
                        xl:shadow-none shadow-lg' >
          <Link to="/nosotros" 
                className='xl:px-10 xl:py-8 
                xl:text-[20px] text-[25px]
                xl:text-black text-white
                xl:relative 
                gradient-text-hover gradient-underline-hover 
                block 
                text-center 
                pt-6 pb-6'>
            Nosotros
            </Link>
        </li>
      </ul>  
    </nav>
  );
}

export default Navbar;

