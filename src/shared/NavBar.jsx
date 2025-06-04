import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
              src="/assets/navbar/Logo_wids2024.webp"
              alt=""
              className="bg-white w-[200px] h-[60px] sm:w-[300px] sm:h-[90px] md:w-[400px] md:h-[120px] ml-5"
            />
          </Link>
          <div
            className="xl:hidden rounded-md w-full items-center mx-6 hover:bg-gray-100"
            onClick={toggle}
          >
            <span
              className={`block w-full h-1 rounded bg-black transition-transform duration-300 ${
                isOpen ? "transform rotate-45 translate-y-1.5" : "mt-1"
              }`}
            ></span>
            <span
              className={`block w-full h-1 rounded bg-black transition-all duration-300 ${
                isOpen ? "opacity-0" : "mt-1"
              }`}
            ></span>
            <span
              className={`block w-full h-1 rounded bg-black transition-transform duration-300 ${
                isOpen ? "transform -rotate-45 -translate-y-0.5" : "mt-1"
              }`}
            ></span>
          </div>
        </div>

        <ul
          className={`xl:w-auto w-full z-50 xl:static absolute xl:flex xl:bg-none p-4 transition-all duration-600 ease-in max-xl:bg-primary-green max-xl:bg-opacity-95 ${
            isOpen ? "opacity-100" : "opacity-0 top-[-1000px] xl:top-0 xl:opacity-100"
          }`}
          id="Menu"
        >
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] text-center  block"
            >
              <div className="relative flex items-center justify-center group  hover:text-gray-300">
                Inicio
                <div className={`absolute bottom-0 left-1/2 w-full h-1 bg-primary-acc-green transform -translate-x-1/2 transition-all duration-300 ${nothome === "" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/cronograma"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] text-center  block"
            >
              <div className="relative flex items-center justify-center group  hover:text-gray-300">
                Conferencia
                <div className={`absolute bottom-0 left-1/2 w-full h-1 bg-primary-orange transform -translate-x-1/2 transition-all duration-300   ${nothome === "cronograma" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/nextgen"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] text-center  block"
            >
              <div className="relative flex items-center justify-center  group  hover:text-gray-300">
                Next Gen
                <div className={`absolute bottom-0 left-1/2 w-full h-1 bg-primary-acc-violet transform -translate-x-1/2 transition-all duration-300  ${nothome === "nextgen" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/datathon"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] text-center  block"
            >
              <div className="relative flex items-center justify-center group hover:text-gray-300">
                Datathon
                <div className={`absolute bottom-0 left-1/2 w-full h-1 bg-primary-acc-yellow transform -translate-x-1/2 transition-all duration-300  ${nothome === "datathon" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
          <li
            className={`mb-1`}
            onClick={toggle2}
          >
            <Link
              to="/nosotros"
              className="xl:px-8 xl:py-8 xl:text-[20px] text-[25px] text-center block"
            >
              <div className="relative flex items-center justify-center group  hover:text-gray-300">
                Nosotros
                <div className={`absolute bottom-0 left-1/2 w-full h-1 bg-primary-acc-blue transform -translate-x-1/2 transition-all duration-300  ${nothome === "nosotros" ? "" : "group-hover:w-[200%]"} `}></div>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
