import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ItemTimeLine } from "./ItemTimeLine";
export function TimeLine({ Data }) {
  let data = Data;
  return (
    <VerticalTimeline>
      {data &&
        data.map((evento, index) => (
          <ItemTimeLine key={index} Evento={evento} />
        ))}
    </VerticalTimeline>
  );
}
