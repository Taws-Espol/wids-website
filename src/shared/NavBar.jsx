import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setIsOpen1(false); // Also close the second menu if it's open
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => {
    setIsOpen(false);
    setIsOpen1(false);
  };

  const location = useLocation();
  const nothome = location.pathname.split('/').pop();

  return (
    <>
      <nav className="left-0 top-0 w-full select-none font-acumin text-sm lg:flex lg:items-center lg:justify-between lg:px-4 lg:text-base lg:text-lg">
        <div className="flex items-center justify-between bg-[rgb(252,252,252)] px-4 py-2">
          <Link to="/">
            <img
              src="/assets/navbar/Logo_wids2024.svg"
              alt=""
              className="h-[80px] w-[250px] bg-white"
            />
          </Link>
          <div
            className="mx-6 w-8 items-center rounded-md hover:bg-gray-100 lg:hidden"
            onClick={toggle}
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
          className={`duration-600 relative z-50 p-4 text-sm transition-all ease-in max-lg:fixed max-lg:top-0 max-lg:h-screen max-lg:w-10/12 max-lg:bg-primary-acc-dark-green lg:static lg:top-0 lg:flex lg:w-auto lg:bg-none lg:opacity-100 ${isOpen ? 'max-lg:right-0 max-lg:opacity-100' : 'max-lg:right-[-100%] max-lg:opacity-0'} `}
          id="Menu"
        >
          {/* Close button in the top right corner when menu is open */}
          <div
            className={`absolute right-4 top-4 w-8 items-center rounded-md hover:bg-gray-100 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
            onClick={toggle}
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

          {/* Menu items with reduced margin and smaller text */}
          <li className={`mb-1`} onClick={toggle2}>
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

          <li className={`mb-1`} onClick={toggle2}>
            <Link
              to="/cronograma"
              className="block text-[18px] lg:px-6 lg:py-4 lg:text-[16px]"
            >
              <div
                className={`group relative flex hover:text-gray-300 ${isOpen ? 'ml-10 py-2 text-left text-3xl text-white' : 'items-center justify-center text-2xl'}`}
              >
                Conferencia
                <div
                  className={`absolute bottom-0 left-1/2 h-1 w-full ${isOpen ? '' : 'bg-primary-orange'} -translate-x-1/2 transform transition-all duration-300 ${nothome === 'cronograma' ? '' : 'group-hover:w-[200%]'} `}
                ></div>
              </div>
            </Link>
          </li>

          <li className={`mb-1`} onClick={toggle2}>
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

          <li className={`mb-1`} onClick={toggle2}>
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

          <li className={`mb-1`} onClick={toggle2}>
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

          {/* Social media icons with reduced size */}
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
    </>
  );
}

export default Navbar;
