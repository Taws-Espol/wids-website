import {VerticalTimelineElement}  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
export function ItemTimeLine({ Evento }) {
    console.log(Evento.info); 
    console.log(Array.isArray(Evento.info));  // Debería ser true si es un array

    let imagen = "";
    let background_color = "";
    let value = Evento.type;
    switch (value) {
        case "Conferencia":
            imagen = "/assets/images-cardInfo/Conferencia.png";
            background_color = "#4ab969";
            break;
        case "Break":
            imagen = "/assets/images-cardInfo/Break.png";
            background_color = "#a2a2ff";
            break;
        case "Taller":
            imagen = "/assets/images-cardInfo/Conferencia.png";
            background_color = "#00a7d5";
            break;
        default:
            imagen = "/assets/images-cardInfo/Conferencia.png";
            background_color = "#a2a2ff";
    }
    
    return <VerticalTimelineElement
    
        className="vertical-timeline-element--work"
        contentArrowStyle={{ 
            borderRight: `10px solid ${background_color}`
        }}
        contentStyle={{ borderTop: ` 10px solid ${background_color}` }}
        iconStyle={{ background:`${background_color}`, color: '#fff' }}
    >
        {Evento.info ? (
            <>
                <h3 className="vertical-timeline-element-title text-primary-dark-green font-bold">{Evento.title}</h3>
                <p className="">{Evento.day}</p>
                {Array.isArray(Evento.info) ? (
                    Evento.info.map((infoItem, index) => (
                        <p key={index} className="">{infoItem}</p>
                    ))
                ) : (
                    <p className="">{Evento.info}</p>
                )}
                {Evento.time && (
                     <div className="flex flex-row">
                         <img src="/public/assets/Eventos/Datathon/reloj.webp" alt="Logo" className="w-5 h-5 mt-[21px] mr-2" />
                         <p className=''>{Evento.time}</p> 
                     </div>
                 )}
                 {Evento.date && (
                     <div className="flex flex-row">
                         <img src="/public/assets/Eventos/Datathon/calendario.webp" alt="Logo" className="w-5 h-5 mt-[21px] mr-2" />
                         <p className=''>{Evento.date}</p> 
                     </div>
                 )}
            </>
        ) : (
                <h1 className={`font-bold text-2xl ${value == "Break" ? 'text-primary-violet':'text-primary-dark-green'}`}>{Evento.title}</h1> 
        )} 
    </VerticalTimelineElement>

}