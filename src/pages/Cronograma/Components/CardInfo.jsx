
export function CardInfo({type,title, info}){

    let image;
    switch (type) {
        case "Evento":
            image = "src/assets/images-cardInfo/Evento.png";
            break;
        case "Taller":
            image = "src/assets/images-cardInfo/Taller.png";
            break;
        case "Break":
            image ="src/assets/images-cardInfo/Break.png";
            break
        default:
            image = "src/assets/images-cardInfo/Evento.png";
    }

    return(
        <div className="flex place-content-center p-8 gap-5 border rounded-md border-indigo-600 w-[482px] " >
            <img src={image} alt="Logo-Evento" className="w-8 h-8"/>
            <div className="flex flex-col gap-2 text-justify">
                <p className="text-2xl text-emerald-900">{title}</p>
                <p className="text-xl">{info}</p>
            </div>
        </div>
    )
}