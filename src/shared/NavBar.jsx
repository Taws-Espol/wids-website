import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => {
    setIsOpen(false);
    setIsOpen1(false);
  };

  const location = useLocation();
  const nothome = location.pathname.split("/").pop();

  return (
    <>
      <nav className="xl:flex xl:items-center xl:justify-between xl:text-[20px] xl:text-lg top-0 left-0 w-full font-acumin text-base select-none">
        <div className="flex items-center bg-[rgb(252,252,252)] justify-between">
          <Link to="/">
            <img
              src="/assets/navbar/Logo_wids2024SG.webp"
              alt=""
              className="bg-white w-[120px] h-[30px] sm:w-[150px] sm:h-[45px] md:w-[200px] md:h-[80px]"
            />
          </Link>
          <div
            className="xl:hidden rounded-md w-8 items-center mx-6 hover:bg-gray-100"
            onClick={toggle}
          >
            <span
              className={`block w-6 h-1 rounded bg-black transition-transform duration-300 ${
                isOpen ? "transform rotate-45 translate-y-1.5" : "mt-1"
              }`}
            ></span>
            <span
              className={`block w-6 h-1 rounded bg-black transition-all duration-300 ${
                isOpen ? "opacity-0" : "mt-1"
              }`}
            ></span>
            <span
              className={`block w-6 h-1 rounded bg-black transition-transform duration-300 ${
                isOpen ? "transform -rotate-45 -translate-y-0.5" : "mt-1"
              }`}
            ></span>
          </div>
        </div>

        <ul
          className={`z-50 p-4 transition-all duration-600 ease-in relative
            xl:w-auto xl:static xl:flex xl:bg-none xl:top-0 xl:opacity-100
            max-xl:w-10/12 max-xl:bg-primary-acc-dark-green max-xl:fixed max-xl:h-screen max-xl:top-0
            ${isOpen ? "max-xl:opacity-100 max-xl:right-0" : "max-xl:opacity-0 max-xl:right-[-100%]"}
          `}
          id="Menu"
        >
          {/* Close button in the top right corner when menu is open */}
          <div
            className={`xl:hidden absolute top-4 right-4 rounded-md w-8 items-center hover:bg-gray-100 ${isOpen ? 'block' : 'hidden'}`}
            onClick={toggle}
          >
            <span
              className={`block w-6 h-1 rounded bg-white transition-transform duration-300 transform rotate-45 translate-y-1.5`}
            ></span>
            <span
              className={`block w-6 h-1 rounded bg-white transition-all duration-300 opacity-0`}
            ></span>
            <span
              className={`block w-6 h-1 rounded bg-white transition-transform duration-300 transform -rotate-45 -translate-y-0.5`}
            ></span>
          </div>
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] block"
            >
              <div className={`relative flex group hover:text-gray-300 ${isOpen ? "text-white  text-left py-2  text-3xl ml-10 mt-52" : "items-center justify-center"}`}>
                Inicio
                <div className={`absolute bottom-0 left-1/2 w-full h-1 
                ${isOpen ? "" : "bg-primary-acc-green"} transform -translate-x-1/2 transition-all duration-300 ${nothome === "" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/cronograma"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] block"
            >
                <div className={`relative flex group hover:text-gray-300 ${isOpen ? "text-white  text-left py-2  text-3xl ml-10" : "items-center justify-center"}`}>
                Conferencia
                <div className={`absolute bottom-0 left-1/2 w-full h-1 ${isOpen ? "" : "bg-primary-orange"}  transform -translate-x-1/2 transition-all duration-300   ${nothome === "cronograma" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/nextgen"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] block"
            >
                <div className={`relative flex group hover:text-gray-300 ${isOpen ? "text-white  text-left py-2  text-3xl ml-10" : "items-center justify-center"}`}>
                Next Gen
                <div className={`absolute bottom-0 left-1/2 w-full h-1 ${isOpen ? "" : "bg-primary-acc-violet"}  transform -translate-x-1/2 transition-all duration-300  ${nothome === "nextgen" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/datathon"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] block"
            >
                <div className={`relative flex group hover:text-gray-300 ${isOpen ? "text-white  text-left py-2  text-3xl ml-10" : "items-center justify-center"}`}>
                Datathon
                <div className={`absolute bottom-0 left-1/2 w-full h-1 ${isOpen ? "" : "bg-primary-acc-yellow"} transform -translate-x-1/2 transition-all duration-300  ${nothome === "datathon" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/nosotros"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] block"
            >
                <div className={`relative flex group hover:text-gray-300 ${isOpen ? "text-white text-left py-2  text-3xl ml-10" : "items-center justify-center"}`}>
                Nosotros
                <div className={`absolute bottom-0 left-1/2 w-full h-1 ${isOpen ? "" : "bg-primary-acc-blue"}  transform -translate-x-1/2 transition-all duration-300  ${nothome === "nosotros" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
          <div className={`xl:hidden flex justify-center items-center gap-6 mt-52 ${isOpen ? '' : 'hidden'}`}>
            <a href="https://www.facebook.com/widsespol" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={40} color="white" />
            </a>
            <a href="https://www.instagram.com/widsespol/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={40} color="white" />
            </a>
            <a href="https://x.com/widsespol" target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={40} color="white" />
            </a>
          </div>
        </ul>

      </nav>
    </>
  );
}

export default Navbar;
