import { info } from "autoprefixer";
import { ListCardInfo } from "./Components/ListCardInfo";
function Cronograma() {
    
    return (
        <div className="flex flex-wrap place-content-center gap-4 p-4 select-none">
        <ListCardInfo 
            LabelInfo={{ type: 'Conferencia' }}
            InfoCard={{ 
                type: 'Evento', 
                title: 'Evento 1',
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin dictum ante et tincidunt. Phasellus porta eleifend dignissim. Suspendisse potenti. Nam a rhoncus mi."
            }}
        />
        <ListCardInfo 
            LabelInfo={{ type: 'Talleres' }}
            InfoCard={{ 
                type: 'Taller', 
                title: 'Evento1',
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            }}
        />
        </div>
    );
}

export default Cronograma;
