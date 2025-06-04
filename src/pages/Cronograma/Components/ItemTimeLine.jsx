/* eslint-disable react/prop-types */
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
export function ItemTimeLine({ Evento }) {
  const imagenConferencista =
    "/assets/Eventos/Ediciones/2024/Images/conferencistas/" + Evento.image;
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
  const timeAlignmentClass =
    Evento.index % 2 === 0
      ? "justify-start min-[1170px]:justify-end"
      : "justify-start";
  const title = Evento.title;
  let titleFirstPart = title;
  let titleSecondPart = "";
  if (title.includes(":")) {
    const splitTitle = title.split(":");
    if (splitTitle[0].length > 8) {
      titleFirstPart = splitTitle[0];
      titleSecondPart = splitTitle[1];
    }
  }

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentArrowStyle={{
        borderRight: `10px solid ${background_color}`,
      }}
      contentStyle={{ borderTop: ` 10px solid ${background_color}` }}
      iconStyle={{ background: `${background_color}`, color: "#fff" }}
      date={Evento.date}
      dateClassName="vertical-timeline-element-date"
    >
      <div className="flex flex-col h-full justify-between">
        {!Evento.date && (
          <div
            className={`pb-5 flex flex-row items-center ${timeAlignmentClass}`}
          >
            <img
              src="/assets/Eventos/Datathon/reloj.webp"
              alt="Logo"
              className="w-8 h-8 mr-2"
            />
            <p className="!m-0 !text-2xl">{Evento.time}</p>
          </div>
        )}
        <div>
          {Evento.info ? (
            <>
              {titleSecondPart ? (
                <>
                  <h3
                    className={`vertical-timeline-element-title text-primary-dark-green font-bold text-[1.7em] text-center`}
                  >
                    {titleFirstPart + ":"}
                  </h3>
                  <h3
                    className={`vertical-timeline-element-title text-primary-dark-green font-bold text-[1.7em] text-center`}
                  >
                    {titleSecondPart}
                  </h3>
                </>
              ) : (
                <h3
                  className={`vertical-timeline-element-title text-primary-dark-green font-bold text-[1.7em] text-center`}
                >
                  {title}
                </h3>
              )}
              {Array.isArray(Evento.info) ? (
                Evento.info.map((infoItem, index) => (
                  <p key={index} className="!text-lg">
                    {infoItem}
                  </p>
                ))
              ) : (
                <div className="h-[22em] mt-4">
                  <div className="p-4 flex items-center justify-center">
                    <img
                      src={imagenConferencista}
                      alt="conferencista"
                      className="h-[12rem] w-[12rem] object-cover rounded-full  "
                    />
                  </div>
                  <div className="flex flex-col h-100% items-center">
                    <p className="!text-2xl !font-bold ">{Evento.info}</p>
                    <p className="text-center !text-xl !mt-3">{Evento.work}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <h1
              className={`font-bold text-2xl ${value == "Break" ? "text-primary-violet" : "text-primary-dark-green"}`}
            >
              {Evento.title}
            </h1>
          )}
        </div>
        {Evento.date && (
          <div
            className={`pt-5 flex flex-row items-center ${timeAlignmentClass}`}
          >
            <img
              src="/assets/Eventos/Datathon/reloj.webp"
              alt="Logo"
              className="w-8 h-8 mr-2"
            />
            <p className="!m-0 !text-2xl">{Evento.time}</p>
          </div>
        )}
      </div>
    </VerticalTimelineElement>
  );
}
