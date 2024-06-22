import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
export function ItemTimeLine({ Evento }) {

    let imagen = "";
    let background_color = "";
    let value = Evento.type;
    switch (value) {
        case "Conferencia":
            imagen = "/assets/images-cardInfo/Conferencia.webp";
            background_color = "#4ab969";
            break;
        case "Break":
            imagen = "/assets/images-cardInfo/Break.webp";
            background_color = "#a2a2ff";
            break;
        case "Taller":
            imagen = "/assets/images-cardInfo/Conferencia.webp";
            background_color = "#00a7d5";
            break;
        default:
            imagen = "/assets/images-cardInfo/Conferencia.webp";
            background_color = "#a2a2ff";
    }
    console.log(Evento.date)
    return <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentArrowStyle={{
            borderRight: `10px solid ${background_color}`
        }}
        contentStyle={{ borderTop: ` 10px solid ${background_color}` }}
        iconStyle={{ background: `${background_color}`, color: '#fff' }}
        date={Evento.date}
        dateClassName="vertical-timeline-element-date"
    >
        {Evento.info ? (
            <>
                <h3 className="vertical-timeline-element-title text-primary-dark-green font-bold text-3xl">{Evento.title}</h3>
                {Array.isArray(Evento.info) ? (
                    Evento.info.map((infoItem, index) => (
                        <p key={index} className="!text-lg">{infoItem}</p>
                    ))
                ) : (
                    <p className="">{Evento.info}</p>
                )}
                {Evento.time && (
                    <div className="flex flex-row items-center">
                        <img src="/assets/Eventos/Datathon/reloj.webp" alt="Logo" className="w-8 h-8  mt-[21px] mr-2" />
                        <p className='!text-2xl'>{Evento.time}</p>
                    </div>
                )}
            </>
        ) : (
            <h1 className={`font-bold text-2xl ${value == "Break" ? 'text-primary-violet' : 'text-primary-dark-green'}`}>{Evento.title}</h1>
        )}
    </VerticalTimelineElement>

}