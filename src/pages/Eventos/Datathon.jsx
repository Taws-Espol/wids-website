import { DatathonInfo } from "../../data/Eventos/Datathon";
import {HackatonDay} from "./Components/HackatonDay";
import SectionPanel from "./Components/SectionPanel";
import { panelData } from "../../data/Eventos/panelData";
function Datathon() {
    const div1 = DatathonInfo[0];
    const words = div1.words
    const div2  = DatathonInfo[1];
    const infos_dvi2 = div2.infos;
    const div3 = DatathonInfo[2];
    const requirements = div3.requirements;
    const div4 = DatathonInfo[3];
    const div5 = DatathonInfo[4];
    const div6 = DatathonInfo[5];
    const infos_dvi6 = div6.infos;
    return (
        <div className="w-full  select-none flex flex-col pb-10 font-sans max-sm:text-base">
            <div>
                <h1 className="text-8xl font-bold font-sans text-left text-primary-dark-green py-5 pl-10 sm:pl-20 md:pl-30 lg:pl-40 xl:pl-50 2xl:pl-60">
                    Datathon 
                </h1>
            </div>
        <div className="relative overflow-hidden flex flex-col md:flex-row justify-between items-center bg-yellow-500 text-primary-dark-green h-[700px] pb-10">
            <div className="w-1/2 flex flex-col items-start text-9xl font-bold p-5">
                <p className='text-[80px] m-40 mb-20 '>
                    {div1.title}
                </p>                
                <div className="flex flex-wrap place-content-center w-full mt-auto text-2xl gap-10 px-20 max-md:m-0 max-md:flex-col max-sm:gap-5 max-md:gap-10 max-sm:text-lg max-md:text-2xl">
                    <button className="text-white bg-green-900 select-none rounded-2xl px-20 py-5 text-center font-sans font-medium max-md:text-lg max-md:px-4 text-3xl"
                         onClick={() => window.open(div1.linkform, '_blank')}
                    >
                        Registrate Aquí
                    </button>
                </div>
            </div> 
                <img src="/src/assets/Eventos/Datathon/data_portada.webp" alt="Logo" className="absolute right-[-55%] top-0 w-full max-w-full max-h-full h-auto object-cover shadow-2xl rounded-full ml-12" />
            </div>
            <div className="flex justify-around items-center px-10 py-5 mt-20 mb-20">
                <div className="text-center">
                    <h3 className="text-5xl font-bold text-cyan-600 mb-5" >{div1.duration}</h3>
                    <p className="text-3xl text-gray-800">Duración</p>
                </div>
                <div className="text-center">
                    <h3 className="text-5xl font-bold text-orange-600 mb-5">{div1.dates}</h3>
                    <p className="text-3xl text-gray-800">Fecha del Datathon</p>
                </div>
            </div>
            <div className="flex justify-center items-center px-10 py-5 mt-5 mb-20">
                <div className="text-center">
                    <h3 className="text-[200px] font-bold text-cyan-600 mb-2" >{div1.premio}</h3>
                    <p className="text-3xl text-gray-800">1er Lugar</p>
                </div>
            </div>
            <div className="bg-cyan-600 flex justify-center items-center px-10 py-5 mt-10 mb-10">
                <div className="text-center">
                    <h3 className="text-7xl font-bold text-white mb-2" >Problema por resolver</h3>
                </div>
            </div>
            <div className="flex justify-center items-center px-10 py-5 mt-10 mb-20">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2" >{div2.msg}</h3>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center px-10 py-5">
                <div className="flex flex-col items-center justifiy-center">
                    <img src="/src/assets/Eventos/Datathon/informe-medico.webp" alt="Logo" className="w-[92px] h-[92px] object-cover " />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi2[0]}</p>
                    </div>
                </div>
                <div className="h-32 w-[5px] bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/src/assets/Eventos/Datathon/tierra.webp" alt="Logo" className="w-[92px] h-[92px] object-cover " />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi2[1]}</p>
                    </div>
                </div>
                <div className="h-32 w-[5px] bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/src/assets/Eventos/Datathon/medico.webp" alt="Logo" className="w-[92px] h-[92px] object-cover" />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi2[2]}</p>
                    </div>
                </div>
                <div className="h-32 w-[5px] bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center"> 
                    <img src="/src/assets/Eventos/Datathon/analitica.webp" alt="Logo" className="w-[92px] h-[92px] object-cover" />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi2[3]}</p>
                    </div>
                </div>
            </div>
            <div className="bg-orange-600 flex justify-center items-center px-10 py-5 mt-10 mb-10">
                <div className="text-center">
                    <h3 className="text-7xl font-bold text-white mb-2" >Participantes</h3>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center px-10 py-5">
                <div className="flex flex-col items-center justifiy-center">
                    <img src="/src/assets/Eventos/Datathon/espol.webp" alt="Logo" className="w-[92px] h-[92px] object-cover " />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi6[0]}</p>
                    </div>
                </div>
                <div className="h-32 w-[5px] bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/src/assets/Eventos/Datathon/colaboracion.webp" alt="Logo" className="w-[92px] h-[92px] object-cover " />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi6[1]}</p>
                    </div>
                </div>
                <div className="h-32 w-[5px] bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center">
                    <img src="/src/assets/Eventos/Datathon/mujer.webp" alt="Logo" className="w-[92px] h-[92px] object-cover" />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi6[2]}</p>
                    </div>
                </div>
                <div className="h-32 w-[5px] bg-gray-600 rounded-full "></div>
                <div className="flex flex-col items-center"> 
                    <img src="/src/assets/Eventos/Datathon/registro.webp" alt="Logo" className="w-[92px] h-[92px] object-cover" />
                    <div className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
                        <p>{infos_dvi6[3]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Datathon;