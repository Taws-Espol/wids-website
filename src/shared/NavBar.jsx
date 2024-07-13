import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const toggle1 = () => {
        setIsOpen1(!isOpen1);
    };
    const toggle2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen(false);
        setIsOpen1(false);
    };
    const location = useLocation();
    const nothome = location.pathname.split("/").pop();
	console.log(nothome)
    const specialPages = ["conferencia", "nextgen", "ediciones","datathon"];

    return (
        <>
            <nav className={`xl:flex
                            xl:items-center
                            xl:justify-between
                            xl:text-[20px]
                            xl:text-lg
                            top-0 left-0
                            w-full
                            font-acumin
                            text-base
                            select-none
                            `}>
                <div className='flex
                                items-center
                                bg-[rgb(252,252,252)]
                                justify-between'>
                    <Link to='/'>
                        <img
                            src='/assets/navbar/Logo_wids2024.webp'
                            alt=''
                            className=" bg-white w-[200px] h-[60px] sm:w-[300px] sm:h-[90px] md:w-[400px] md:h-[120px] ml-5"/>
                    </Link>
                    <div className='xl:hidden
                                    rounded-md
                                    w-6
                                    items-center
                                    mx-6
                                    hover:bg-gray-100 '
                        onClick={toggle}>
                        <span className={`  block
                                            w-full h-1
                                            rounded
                                            bg-black
                                            transition-transform duration-300
                                            ${isOpen ? "transform rotate-45 translate-y-1.5 -translate-x-0" : "mt-1"}`}
                        ></span>
                        <span className={`  block
                                            w-full h-1
                                            rounded
                                            bg-black
                                            transition-all duration-300
                                            ${isOpen ? "opacity-0" : "mt-1"}`}
                        ></span>
                        <span className={`  block
                                            w-full h-1
                                            rounded
                                            bg-black
                                            transition-transform duration-300
                                            ${isOpen ? 'transform -rotate-45 -translate-y-0.5 -translate-x-0' : 'mt-1'}`}
                        ></span>
                    </div>
                </div>
                <ul className={`xl:w-auto w-full
                                z-50
                                xl:static absolute
                                xl:flex
                                xl:l-0
                                xl:bg-none
                                p-4
                                transition-all duration-600 ease-in
                                xl:translate-x-0
								max-xl:bg-primary-green
								max-xl:bg-opacity-95
                                ${isOpen ? "opacity-100 ": "opacity-0 top-[-1000px] xl:top-0 xl:opacity-100"}`}
                                id='Menu'>
                    <li className={` xl:border-0
                                    xl:font-thin font-black
                                    xl:shadow-none shadow-lg
									max-xl:w-full
                                    mb-1 ${nothome==="" ? 'underline-offset-8 primary-yellow active':''}`}
                        onClick={toggle2}>
                        <Link   to='/'
                                className={`xl:px-8 xl:py-8
                                            xl:text-[20px] text-[25px]
                                            xl:text-black text-white
											max-xl:w-full
                                            block
                                            text-center text-stroke
                                            pt-6 pb-6
											max-xl:hover:bg-primary-yellow
                                            `}>
                            Inicio
                        </Link>
                    </li>
                    {/*<li className={`xl:border-0 xl:font-thin font-black  xl:shadow-none shadow-lg mb-1 relative ${nothome==="cronograma" ? 'underline-offset-8 primary-orange active':''}`}
                        onClick={toggle2}>
                        <Link   to='/cronograma'
                            className={`xl:px-8 xl:py-8
xl:text-[20px] text-[25px]
xl:text-black text-white
relative
block
text-center
pt-6 pb-6
max-xl:hover:bg-primary-orange
`}>
                            Cronograma
                        </Link>
                    </li>*/}
                    <li className={`xl:border-0
                        xl:font-thin font-black
                        xl:shadow-none shadow-lg
                        mb-1 ${nothome==="conferencistas" ? 'underline-offset-8  primary-dark-green active':''}`}
                        onClick={toggle2} >
                        <Link   to='/conferencistas'
                                className={`xl:px-8 xl:py-8
                                            xl:text-[20px] text-[25px]
                                            xl:text-black text-white
                                            relative
                                            block
                                            text-center
                                            pt-6 pb-6
											max-xl:hover:bg-primary-dark-green
                                            `}>
                            Conferencistas
                        </Link>
                    </li>
                    <li className=' xl:relative
                                    xl:border-0
                                    xl:font-thin font-black
                                    xl:shadow-none shadow-lg
                                    xl:flex
                                    justify-center
                                    items-center
                                    mb-1'>
                        <div className='flex
                                        justify-center
                                        items-center
										max-xl:hover:bg-primary-blue'>
                            <p className={` xl:px-8 xl:py-8
                                            xl:text-[20px] text-[25px]
                                            xl:text-black text-white
                                            text-center
                                            pt-6 pb-6
                                            flex
                                            justify-center
                                            items-center
                                            cursor-pointer
                                            ${specialPages.includes(nothome) ? 'underline-offset-8-evento primary-orange active':''}
                                            `}
                                id='event-section'
                                onClick={toggle1}>
                                Eventos
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
                                        ${isOpen1 ? "show" : ""}`}>
                            <li className='link-with-gradient-border ' onClick={toggle2}>
                                <Link
                                    to='/eventos/datathon'
                                    className=' xl:px-8 xl:py-2
                                                xl:text-[20px] text-[25px]
                                                block
                                                hover:bg-gray-100
												max-xl:hover:bg-primary-blue
                                                pt-5 pb-5'>
                                    Datathon
                                </Link>
                            </li>
                            <li className='link-with-gradient-border ' onClick={toggle2}>
                                <Link
                                    to='/eventos/nextgen'
                                    className=' xl:px-8 xl:py-2
                                                xl:text-[20px] text-[25px]
                                                block
                                                hover:bg-gray-100
												max-xl:hover:bg-primary-blue
                                                pt-5 pb-5'>
                                    Next Gen
                                </Link>
                            </li>
                            <li className='link-with-gradient-border ' onClick={toggle2}>
                                <Link
                                    to='/eventos/ediciones'
                                    className=' xl:px-8 xl:py-2
                                                xl:text-[20px] text-[25px]
                                                block
                                                hover:bg-gray-100
												max-xl:hover:bg-primary-blue
                                                pt-5 pb-5'>
                                    Ediciones Anteriores
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={` xl:border-0
                                    xl:font-thin font-black
                                    xl:shadow-none shadow-lg
									max-xl:hover:bg-primary-violet
									${nothome==="nosotros" ? 'underline-offset-8 primary-violet active':''}`}
                                    onClick={toggle2}>
                        <Link   to='/nosotros'
                                className={`xl:px-10 xl:py-8
                                            xl:text-[20px] text-[25px]
                                            xl:text-black text-white
                                            xl:relative
                                            block
                                            text-center
                                            pt-6 pb-6
                                            `}>
                            Nosotros
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
export default Navbar;
