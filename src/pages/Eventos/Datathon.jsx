import { DatathonInfo } from "../../data/Eventos/Datathon";
import { HackatonDay } from "./Components/HackatonDay";
import { TimeLine } from "../Cronograma/Components/TimeLineDatathon";

function Datathon() {
    const div1 = DatathonInfo[0];
    const words = div1.words
    const div2 = DatathonInfo[1];
    const infos_dvi2 = div2.infos;
    const div3 = DatathonInfo[2];
    const requirements = div3.requirements;
    const div4 = DatathonInfo[3];
    const div5 = DatathonInfo[4];
    const cronograma = div5.crono;
    const div6 = DatathonInfo[5];
    const infos_dvi6 = div6.infos;

    return (
        <div className="w-full select-none flex flex-col pb-10 font-acumin max-sm:text-base">
            <div>
                <h1 className="flex justify-center items-center md:justify-normal md:items-stretch text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl font-bold font-acumin text-left text-primary-dark-green py-5 pb-5 md:pl-16 lg:pl-32 xl:pl-40 2xl:pl-48">
                    Datathon
                </h1>
            </div>
            <div className="relative overflow-hidden flex flex-col md:justify-between justify-center items-center sm:items-center md:items-start 2xl:items-start bg-yellow-500 text-primary-dark-green h-[800px] sm:h-[900px] md:h-[500px] lg:h-[500px] 2xl:h-[700px] pb-10">
                <div className=" md:w-1/2 w-4/5 flex flex-col md:items-start 2xl:items-start font-bold p-10 md:p-5 2xl:p-5">
                    <p className=' text-5xl md:text-[50px] lg:text-[65px] xl:text-[80px] 2xl:text-[80px] mb-10 sm:mb-20 md:mt-10 md:ml-16 lg:ml-32 lg:mb-8 xl:ml-48 xl:mb-10 2xl:ml-48 2xl:mt-20 2xl:mb-10 '>
                        {div1.title}
                    </p>
                    <div className="flex flex-wrap place-content-center w-full mt-auto text-2xl gap-10 px-20 max-md:m-0 max-md:flex-col max-sm:gap-5 max-md:gap-10 max-sm:text-lg max-md:text-xl justify-center items-center lg:pl-56">
                        <button className="text-white bg-green-900 whitespace-nowrap select-none rounded-3xl px-20 py-5 text-center font-acumin font-medium max-md:text-lg max-md:px-4 text-3xl"
                            onClick={() => window.open(div1.linkform, '_blank')}
                        >
                            Registrate aquí
                        </button>
                    </div>
                </div>
                <img src="/assets/Eventos/Datathon/data_portada.webp" alt="Logo" className="md:absolute md:right-[-55%] md:top-0 md:pt-0 w-full max-w-[80%] sm:max-w-[70%] md:max-w-full max-h-[80%] sm:max-h-[70%] md:max-h-full h-auto md:object-cover shadow-xl md:shadow-2xl rounded-full sm:ml-0 md:ml-0 lg:ml-12 xl:ml-12 ml-12" />
            </div>
            <div className="flex flex-row place-content-center place-items-center mb-10 font-semibold flex-wrap max-sm:gap-20">
                <div className="text-center max-w-56">
                    <h3 className="text-5xl font-bold text-cyan-600 mb-3" >{div1.duration}</h3>
                    <p className="text-3xl text-gray-800">Duración</p>
                </div>
                <div className="flex justify-center items-center px-28  mb-5 relative max-sm:hidden">
                    <div className="text-center">
                        <h3 className="text-[150px] sm:text-[10vw] font-bold text-cyan-600" >{div1.premio}</h3>
                    </div>
                    <div className="absolute top-52">
                        <p className="text-7xl text-gray-800 font-bold mt-5">1er Lugar</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center px-28 mb-5 sm:hidden">
                    <div className="text-center">
                        <h3 className="text-[100px] sm:text-[200px] font-bold text-cyan-600" >{div1.premio}</h3>
                    </div>
                    <div className="">
                        <p className="text-7xl max-sm:text-4xl text-gray-800 font-bold mt-5">1er Lugar</p>
                    </div>
                </div>
                <div className="text-center max-w-56">
                    <h3 className="text-5xl font-bold text-orange-600 mb-3">{div1.dates}</h3>
                    <p className="text-3xl text-gray-800">Fechas</p>
                </div>
            </div>
            <div className="bg-cyan-600 flex justify-center items-center px-10 py-5 sm:mt-10 sm:mb-10">
                <div className="text-center">
                    <h3 className="text-5xl sm:text-7xl font-bold text-white mb-2" >Problema por resolver</h3>
                </div>
            </div>
            <div className="flex justify-center items-center px-10 py-5 mt-10 mb-20">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2" >{div2.msg}</h3>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center px-10 py-5">
                <div className="flex flex-col items-center justifiy-center">
                    <img src="/assets/Eventos/Datathon/informe-medico.webp" alt="Logo" className="w-[92px] h-[92px] object-cover " />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi2[0]}</p>
                    </div>
                </div>
                <div className="h-[5px] w-32 lg:h-32 lg:w-[5px] mt-5 mb-5 lg:mt-0 lg:mb-0 bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/assets/Eventos/Datathon/tierra.webp" alt="Logo" className="w-[92px] h-[92px] object-cover " />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi2[1]}</p>
                    </div>
                </div>
                <div className="h-[5px] w-32 lg:h-32 lg:w-[5px] mt-5 mb-5 lg:mt-0 lg:mb-0 bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/assets/Eventos/Datathon/medico.webp" alt="Logo" className="w-[92px] h-[92px] object-cover" />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi2[2]}</p>
                    </div>
                </div>
                <div className="h-[5px] w-32 lg:h-32 lg:w-[5px] mt-5 mb-5 lg:mt-0 lg:mb-0 bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/assets/Eventos/Datathon/analitica.webp" alt="Logo" className="w-[92px] h-[92px] object-cover" />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi2[3]}</p>
                    </div>
                </div>
            </div>
            <div className="bg-orange-600 flex  justify-center items-center px-10 py-5 mt-10 mb-10">
                <div className="text-center">
                    <h3 className="text-5xl sm:text-7xl font-bold text-white mb-2" >Participantes</h3>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center px-10 py-5">
                <div className="flex flex-col items-center justifiy-center">
                    <img src="/assets/Eventos/Datathon/espol.webp" alt="Logo" className="w-[92px] h-[92px] object-cover " />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi6[0]}</p>
                    </div>
                </div>
                <div className="h-[5px] w-32 lg:h-32 lg:w-[5px] mt-5 mb-5 lg:mt-0 lg:mb-0 bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/assets/Eventos/Datathon/colaboracion.webp" alt="Logo" className="w-[92px] h-[92px] object-cover " />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi6[1]}</p>
                    </div>
                </div>
                <div className="h-[5px] w-32 lg:h-32 lg:w-[5px] mt-5 mb-5 lg:mt-0 lg:mb-0 bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/assets/Eventos/Datathon/mujer.webp" alt="Logo" className="w-[92px] h-[92px] object-cover" />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi6[2]}</p>
                    </div>
                </div>
                <div className="h-[5px] w-32 lg:h-32 lg:w-[5px] mt-5 mb-5 lg:mt-0 lg:mb-0 bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/assets/Eventos/Datathon/registro.webp" alt="Logo" className="w-[92px] h-[92px] object-cover" />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi6[3]}</p>
                    </div>
                </div>
            </div>
            <div className="bg-green-600 flex  justify-center items-center px-10 py-5 mt-10 mb-10">
                <div className="text-center">
                    <h3 className="text-5xl sm:text-7xl font-bold text-white mb-2" >Cronograma</h3>
                </div>
            </div>
            <div className='w-full'>
                {<TimeLine Data={cronograma} />}
            </div>
        </div>
    );
}

export default Datathon;
