import { info } from "autoprefixer";
import { ListCardInfo } from "./Components/ListCardInfo";
function Cronograma() {
    
    return (
        <div className="flex flex-col place-content-center place-items-center gap-10 select-none">
            <h1 className="text-4xl text-primary-dark-green font-acumin pt-5">Cronograma</h1>
            <div className="flex flex-wrap place-content-center  max-lg:gap-10 gap-4 px-4 pb-20 select-none">
            <ListCardInfo 
                typeLabel='Conferencias'
            />
            <ListCardInfo 
                typeLabel='Talleres'
            />
            </div>
        </div>
    );
}

export default Cronograma;
