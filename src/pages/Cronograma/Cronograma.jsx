import { info } from "autoprefixer";
import { ListCardInfo } from "./Components/ListCardInfo";
function Cronograma() {
    
    return (
        <div className="flex flex-wrap place-content-center gap-4 p-4 select-none">
        <ListCardInfo 
            typeLabel='Conferencias'
        />
        <ListCardInfo 
            typeLabel='Talleres'
        />
        </div>
    );
}

export default Cronograma;
