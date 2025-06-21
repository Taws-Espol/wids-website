import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const nothome = location.pathname.split('/').pop();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const closeAllMenus = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="left-0 top-0 w-full select-none font-acumin text-sm lg:flex lg:items-center lg:justify-between lg:px-4 lg:text-base lg:text-lg">
      <div className="flex items-center justify-between bg-white px-4 py-2">
        <Link to="/" onClick={closeAllMenus}>
          <img
            src="/assets/navbar/Logo_wids2024.svg"
            alt="WiDS Logo"
            className="h-[80px] w-[250px] bg-white"
          />
        </Link>
        <div
          className="mx-6 w-8 items-center rounded-md hover:bg-white lg:hidden"
          onClick={toggleMobileMenu}
        >
          <span
            className={`block h-1 w-6 rounded bg-black transition-transform duration-300 ${isOpen ? 'translate-y-1.5 rotate-45 transform' : 'mt-1'}`}
          ></span>
          <span
            className={`block h-1 w-6 rounded bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : 'mt-1'}`}
          ></span>
          <span
            className={`block h-1 w-6 rounded bg-black transition-transform duration-300 ${isOpen ? '-translate-y-0.5 -rotate-45 transform' : 'mt-1'}`}
          ></span>
        </div>
      </div>

      <ul
        className={`duration-600 relative z-50 p-4 text-sm transition-all ease-in max-lg:fixed max-lg:top-0 max-lg:h-screen max-lg:w-10/12 max-lg:bg-primary-acc-dark-green lg:static lg:top-0 lg:flex lg:w-auto lg:bg-none lg:opacity-100 ${isOpen ? 'max-lg:right-0 max-lg:opacity-100' : 'max-lg:right-[-100%] max-lg:opacity-0'}`}
        id="Menu"
      >
        <div
          className={`absolute right-4 top-4 w-8 items-center rounded-md hover:bg-white lg:hidden ${isOpen ? 'block' : 'hidden'}`}
          onClick={toggleMobileMenu}
        >
          <span
            className={`block h-1 w-6 translate-y-1.5 rotate-45 transform rounded bg-white transition-transform duration-300`}
          ></span>
          <span
            className={`block h-1 w-6 rounded bg-white opacity-0 transition-all duration-300`}
          ></span>
          <span
            className={`block h-1 w-6 -translate-y-0.5 -rotate-45 transform rounded bg-white transition-transform duration-300`}
          ></span>
        </div>

        <li className="mb-1" onClick={closeAllMenus}>
          <Link
            to="/"
            className="block text-[18px] lg:px-6 lg:py-4 lg:text-[16px]"
          >
            <div
              className={`group relative flex hover:text-gray-300 ${isOpen ? 'ml-10 mt-52 py-2 text-left text-3xl text-white' : 'items-center justify-center text-2xl'}`}
            >
              Inicio
              <div
                className={`absolute bottom-0 left-1/2 h-1 w-full ${isOpen ? '' : 'bg-primary-acc-green'} -translate-x-1/2 transform transition-all duration-300 ${nothome === '' ? '' : 'group-hover:w-[200%]'} `}
              ></div>
            </div>
          </Link>
        </li>

        <li className="relative mb-1" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-[18px] lg:px-6 lg:py-4 lg:text-[16px]"
          >
            <div
              className={`group relative flex hover:text-gray-300 ${isOpen ? 'ml-10 py-2 text-left text-3xl text-white' : 'items-center justify-center text-2xl'}`}
            >
              Conferencia
              <div
                className={`absolute bottom-0 left-1/2 h-1 w-full ${isOpen ? '' : 'bg-primary-orange'} -translate-x-1/2 transform transition-all duration-300 ${nothome === 'cronograma' || nothome === 'conferencistas' ? '' : 'group-hover:w-[200%]'} `}
              ></div>
            </div>
          </button>

          {isDropdownOpen && (
            // CAMBIO: Se eliminó mt-2 para subir el menú
            <div className="absolute left-1/2 top-full hidden w-48 -translate-x-1/2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 lg:block">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  to="/cronograma"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-white"
                  role="menuitem"
                  onClick={closeAllMenus}
                >
                  Cronograma
                </Link>
                <Link
                  to="/conferencistas"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-white"
                  role="menuitem"
                  onClick={closeAllMenus}
                >
                  Conferencistas
                </Link>
              </div>
            </div>
          )}

          {isDropdownOpen && isOpen && (
            <div className="w-full pl-16 lg:hidden">
              <Link
                to="/cronograma"
                className="block py-2 text-left text-2xl text-white hover:text-gray-300"
                onClick={closeAllMenus}
              >
                Cronograma
              </Link>
              <Link
                to="/conferencistas"
                className="block py-2 text-left text-2xl text-white hover:text-gray-300"
                onClick={closeAllMenus}
              >
                Conferencistas
              </Link>
            </div>
          )}
        </li>

        <li className={`mb-1`} onClick={closeAllMenus}>
          <Link
            to="/nextgen"
            className="block text-[18px] lg:px-6 lg:py-4 lg:text-[16px]"
          >
            <div
              className={`group relative flex hover:text-gray-300 ${isOpen ? 'ml-10 py-2 text-left text-3xl text-white' : 'items-center justify-center text-2xl'}`}
            >
              Next Gen
              <div
                className={`absolute bottom-0 left-1/2 h-1 w-full ${isOpen ? '' : 'bg-primary-acc-violet'} -translate-x-1/2 transform transition-all duration-300 ${nothome === 'nextgen' ? '' : 'group-hover:w-[200%]'} `}
              ></div>
            </div>
          </Link>
        </li>
        <li className={`mb-1`} onClick={closeAllMenus}>
          <Link
            to="/datathon"
            className="block text-[18px] lg:px-6 lg:py-4 lg:text-[16px]"
          >
            <div
              className={`group relative flex hover:text-gray-300 ${isOpen ? 'ml-10 py-2 text-left text-3xl text-white' : 'items-center justify-center text-2xl'}`}
            >
              Datathon
              <div
                className={`absolute bottom-0 left-1/2 h-1 w-full ${isOpen ? '' : 'bg-primary-acc-yellow'} -translate-x-1/2 transform transition-all duration-300 ${nothome === 'datathon' ? '' : 'group-hover:w-[200%]'} `}
              ></div>
            </div>
          </Link>
        </li>
        <li className={`mb-1`} onClick={closeAllMenus}>
          <Link
            to="/nosotros"
            className="block text-[18px] lg:px-6 lg:py-4 lg:text-[16px]"
          >
            <div
              className={`group relative flex hover:text-gray-300 ${isOpen ? 'ml-10 py-2 text-left text-3xl text-white' : 'items-center justify-center text-2xl'}`}
            >
              Nosotros
              <div
                className={`absolute bottom-0 left-1/2 h-1 w-full ${isOpen ? '' : 'bg-primary-acc-blue'} -translate-x-1/2 transform transition-all duration-300 ${nothome === 'nosotros' ? '' : 'group-hover:w-[200%]'} `}
              ></div>
            </div>
          </Link>
        </li>

        {/* Social media icons */}
        <div
          className={`mt-52 flex items-center justify-center gap-6 lg:hidden ${isOpen ? '' : 'hidden'}`}
        >
          <a
            href="https://www.facebook.com/widsespol"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={30} color="white" />
          </a>
          <a
            href="https://www.instagram.com/widsespol/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={30} color="white" />
          </a>
          <a
            href="https://x.com/widsespol"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter size={30} color="white" />
          </a>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
