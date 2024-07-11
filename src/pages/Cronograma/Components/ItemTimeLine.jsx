/* eslint-disable react/prop-types */
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
export function ItemTimeLine({ Evento }) {
    const imagenConferencista = "/assets/Eventos/Ediciones/2024/Images/conferencistas/" + Evento.image
    let imagen = "";
    let background_color = "";
    let value = Evento.color;
    switch (value) {
        case "verde":
            imagen = "/assets/images-cardInfo/Conferencia.webp";
            background_color = "#4ab969";
            break;
        case "morado":
            imagen = "/assets/images-cardInfo/Break.webp";
            background_color = "#a2a2ff";
            break;
        case "celeste":
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
                        <div className='h-[18.5em]'>
                            <br/>
                            <div className='p-4 flex items-center justify-center'>
                                <img src={imagenConferencista} alt='conferencista' className='h-[12rem] w-[12rem] object-cover rounded-full  ' />
                            </div>
                            <div className=' h-100%'>
                                <p className='align-bottom'>{Evento.info}</p>
                            </div>
                        </div>
                    )}
                {Evento.time && (
                    <div className="mt-2 flex flex-row items-center">
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
