import { ConferenceContainer } from "./Components/ConferencesContainer"
import { ediciones } from "../../data/ediciones";
function Conferencistas() {
    const year = "2024";
    const edicionData = ediciones.find((edicion) => edicion.edicion === year);
    return (
        <div className="font-acumin flex flex-col place-content-center place-items-center w-full select-none">
            <div className="w-full flex justify-center items-center text-center relative mt-10 mb-20">
                <div id='rectangulo_corneL' className="absolute bottom-[-30px] left-9 max-xl:left-4 w-1/4 h-48 bg-custom-peach max-lg:hidden z-[5]"></div>
                <div id='rectangulo_corneR' className="absolute top-[-30px] right-9 max-xl:right-4 w-1/4 h-48 bg-custom-purple max-lg:hidden z-[5]"></div>
                <div className=" flex flex-col w-full items-center place-content-center place-items-center max-lg:mt-32">
                    <img src="/assets/Conferences/conference.webp" alt="conference" className="w-11/12 h-96 object-cover object-top relative z-[10]" />
                    </div>
                <div id='rectangulo_text' className=" absolute top-[-30px] lg:left-20 lg:w-96 h-34 left-0 w-full bg-custom-gre z-[15] ">
                    <h1 className="text-5xl font-bold mb-4 mt-2 text-white">Conferencistas</h1>
                    <h1 className="text-5xl font-bold mb-4 text-white">WIDS</h1>
                </div>
            </div>
            <div className="w-3/4 mb-10">
                <ConferenceContainer edicionData={edicionData} />
            </div>
        </div>
    );
}
export default Conferencistas;

