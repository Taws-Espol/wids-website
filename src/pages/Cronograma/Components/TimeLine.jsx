import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { ItemTimeLine } from './ItemTimeLine';
export function TimeLine({ Data, active }) {
  let data = Data[active];
  return (
    <VerticalTimeline>
      {data &&
        data.map((evento, index) => (
          <ItemTimeLine key={index} Evento={evento} />
        ))}
    </VerticalTimeline>
  );
}
