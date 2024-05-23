import {VerticalTimelineElement}  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
export function ItemTimeLine({ Evento }) {

    let imagen = "";
    let background_color = "";
    let value = Evento.type;
    switch (value) {
        case "Conferencia":
            imagen = "/src/assets/images-cardInfo/Conferencia.png";
            background_color = "#00a7d5";
            break;
        case "Break":
            imagen = "/src/assets/images-cardInfo/Break.png";
            background_color = "#ffcb05";
            break;
        case "Talleres":
            imagen = "/src/assets/images-cardInfo/Break.png";
            background_color = "#4ab969";
            break;
        default:
            imagen = "/src/assets/images-cardInfo/Conferencia.png";
            background_color = "#4ab969";
            break;
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
                <p>{Evento.info}</p>
            </>
        ) : (
                <h1 className="text-primary-dark-green font-bold">{Evento.title}</h1>
        )}
    </VerticalTimelineElement>

}