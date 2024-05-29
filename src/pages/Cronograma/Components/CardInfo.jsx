
export function CardInfo({type,title, info}){

    let image;
    switch (type) {
        case "Conferencia":
            image = "/assets/images-cardInfo/Conferencia.png";
            break;
        case "Taller":
            image = "/assets/images-cardInfo/Taller.png";
            break;
        case "Break":
            image ="/assets/images-cardInfo/Break.png";
            break
        default:
            image = "/assets/images-cardInfo/Evento.png";
    }

    return(
        <div className="flex place-content-start p-8 gap-5 border rounded-md border-indigo-600 w-[482px] font-acumin max-xsm:w-[300px] max-sm:w-[375px]" >
            <img src={image} alt="Logo-Evento" className="w-8 h-8 max-sm:w-7 max-sm:h-7 "/>
            <div className="flex flex-col gap-2 text-justify">
                <p className="text-2xl text-primary-dark-green max-xsm:text-lg max-sm:text-xl">{title}</p>
                <p className="text-xl max-xsm:text-base">{info}</p>
            </div>
        </div>
    )
}