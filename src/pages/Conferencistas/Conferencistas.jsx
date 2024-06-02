import {ConferenceContainer} from "./Components/ConferencesContainer"
import { ediciones } from "../../data/ediciones";
function Conferencistas() {
    const year = "2024";
    const edicionData = ediciones.find((edicion) => edicion.edicion === year);
    return (
        <div className="flex flex-col place-content-center place-items-center w-full">
            <div className="w-3/4">
                <div className="">
                    <img src="/assets/Conferences/conference.png" alt="conference"  className="w-full h-96 object-cover object-top"/>
                </div>
            </div>
            <div className="w-3/4">
                <ConferenceContainer edicionData={edicionData} />
            </div>
        </div>
    );
}
export default Conferencistas;

