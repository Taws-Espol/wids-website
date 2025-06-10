import React, { useState, useRef } from 'react';
import { ProfileCard } from './../../Edicion/Components/ProfileCard';
import { Tooltip } from '@material-tailwind/react';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export function ConferenceContainer({
  edicionData,
  campo = 'conferencistas',
  div_principal = 'details-div',
}) {
  const [conferenceActive, setConferenceActive] = useState(null);
  const [active, setActive] = useState('Cronograma');
  const detailsDivRef = useRef(null);

  const changeConferenceActive = (conferencista) => {
    setConferenceActive(conferencista);
    setTimeout(() => {
      if (detailsDivRef.current) {
        detailsDivRef.current.scrollTop = 0;
      }
      document
        .getElementById(div_principal)
        .scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  let link = {
    2020: '/assets/Eventos/Ediciones/2020/Images/conferencistas/',
    2021: '/assets/Eventos/Ediciones/2021/Images/conferencistas/',
    2022: '/assets/Eventos/Ediciones/2022/Images/conferencistas/',
    2023: '/assets/Eventos/Ediciones/2023/Images/conferencistas/',
    2024: '/assets/Eventos/Ediciones/2024/Images/conferencistas/',
  };
  let edition = edicionData.edicion;
  const path_conferencistas = link[edition];
  let imganName = conferenceActive && conferenceActive.imageName;
  let image = path_conferencistas + imganName;

  return (
    <>
      <div className="font-acumin flex flex-row flex-wrap place-content-center place-items-center gap-10">
        {conferenceActive && (
          <div
            id={div_principal}
            className="my-20 flex w-full flex-row flex-wrap place-content-center place-items-center gap-10 py-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-2xl"
          >
            <img
              src={image}
              alt="Conferencista"
              className="h-96 w-96 rounded-3xl object-cover max-sm:h-80 max-sm:w-80"
            />
            <div className="flex h-[384px] w-[800px] flex-col justify-center gap-8 rounded-xl p-10 align-middle max-sm:w-[350px]">
              <div className="flex flex-col max-sm:mt-10">
                <p className="text-3xl font-bold text-primary-dark-green">
                  {conferenceActive.name}
                </p>
                <p className="text-2xl">
                  {conferenceActive.work}, {conferenceActive.place}
                </p>
              </div>
              <div
                className="flex min-h-[200px] w-full place-content-start overflow-y-auto"
                ref={detailsDivRef}
              >
                {' '}
                {}
                <p className="text-justify">{conferenceActive.info}</p>
              </div>
              <div className="flex gap-20">
                {conferenceActive.linkeding && (
                  <Tooltip content="Follow on LinkedIn">
                    <a
                      href={conferenceActive.linkeding}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size={30} />
                    </a>
                  </Tooltip>
                )}
                {conferenceActive.x && (
                  <Tooltip content="Follow on X">
                    <a
                      href={conferenceActive.x}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaXTwitter size={30} />
                    </a>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        )}
        {edicionData &&
          edicionData[campo].map((conferencista, index) => (
            <ProfileCard
              key={index}
              conferencista={conferencista}
              onClickFunction={() => changeConferenceActive(conferencista)}
              active={conferenceActive}
              year={edition}
            />
          ))}
      </div>
    </>
  );
}
