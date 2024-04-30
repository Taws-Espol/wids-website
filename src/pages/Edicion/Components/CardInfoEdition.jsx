import evento from '../../../assets/images-cardInfo/Event.png';
import taller from '../../../assets/images-cardInfo/Taller.png';

export function CardInfoEdition({type,title, info,changeButton}){
    let image;
    switch (type) {
        case "Cronograma":
            image = evento;
            break;
        case "Talleres":
            image = taller;
            break;
        default:
            image = evento
    }
    return(
        <div className="flex place-content-start place-items-center p-8 gap-10 border rounded-md border-indigo-600 w-[1100px] font-acumin  max-md:w-[500px] max-xl:w-[700px] max-xsm:w-[300px] max-sm:w-[375px]">
            <img src={image} alt="Logo-Evento" className="w-10 h-10 max-sm:w-8 max-sm:h-8"/>
            <div className="flex flex-col gap-2 text-justify">
                <p className="text-2xl text-primary-dark-green max-xsm:text-lg max-sm:text-xl">{title}</p>
                <p className="text-xl max-xsm:text-base">{info}</p>
            </div>
        </div>
    )
}