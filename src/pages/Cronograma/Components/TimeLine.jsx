import {VerticalTimeline}  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {ItemTimeLine} from "./ItemTimeLine";
export function TimeLine({Data,active}){
    let data = "" ;
    switch(active){
        case 'Conferencias':
            data = Data.Conferencias;
            break;
        case 'Talleres':
            data = Data.Talleres;
            break;
        default:
            data = Data.Conferencias;
    }
    return <VerticalTimeline>
        {
            data && data.map((evento, index) => (
                <ItemTimeLine Key={index} Evento={evento}/>
            ))
        }
    </VerticalTimeline>
}