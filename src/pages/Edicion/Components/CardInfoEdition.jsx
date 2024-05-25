export function CardInfoEdition({type, evento}){
    const path_info_crongrama = "/src/assets/Eventos/Ediciones/2020/Images/cronograma/";
    const path_info_talleres = "/src/assets/Eventos/Ediciones/2020/Images/talleres/";
    let image_crono = path_info_crongrama+evento.imageName;
    let image_talleres = path_info_talleres+evento.imageName;
    let image = "";
    switch(type){
        case 'Talleres':
            image = image_talleres;
            break;
        default:
            image=image_crono;
    }
    return(
        <div className="flex place-content-start place-items-center p-8 gap-10 border-2 rounded-md hover:border-primary-violet w-[1100px] font-acumin  max-md:w-[500px] max-xl:w-[700px] max-xsm:w-[300px] max-sm:w-[375px] max-sm:flex-col">
            <img className="w-20 h-20 rounded-full" src={image} alt="Rounded avatar"/>
            <div className="flex flex-col gap-2 text-justify w-4/6  max-sm:w-full">
                <p className={`text-2xl text-primary-dark-green font-bold max-xsm:text-lg max-sm:text-xl ${evento.title.length<15 ? "max-sm:text-center":""}`}>{evento.title}</p>
                {evento.name ? <p className="text-xl max-xsm:text-base">por <strong>{evento.name}</strong>, {evento.place}</p> : ""}
                <p className="text-xl max-xsm:text-base">{evento.work}</p>
            </div>
            <div className="flex place-content-center place-items-center first: gap-2 text-justify w-1/6 max-sm:w-full min-w-44">
                    <img src="/src/assets/Eventos/Datathon/reloj.png" alt="reloj" className="max-h-5 aspect-square object-contain shadow-2xl" />
                    <p>{evento.schedule}</p>
            </div>
        </div>
    );
};