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

  const link = {
    2020: '/assets/Eventos/Ediciones/2020/Images/conferencistas/',
    2021: '/assets/Eventos/Ediciones/2021/Images/conferencistas/',
    2022: '/assets/Eventos/Ediciones/2022/Images/conferencistas/',
    2023: '/assets/Eventos/Ediciones/2023/Images/conferencistas/',
    2024: '/assets/Eventos/Ediciones/2024/Images/conferencistas/',
    2025: '/assets/Eventos/Ediciones/2025/Images/conferencistas/',
  };

  const edition = edicionData.edicion;
  const path_conferencistas = link[edition];
  const imganName = conferenceActive?.imageName || '';
  const image = path_conferencistas + imganName;

  return (
    <div className="mt-10 px-4">
      <div className="flex flex-wrap items-center justify-center gap-10 font-acumin">
        {conferenceActive && (
          <div
            id={div_principal}
            className="my-20 flex w-full flex-wrap items-center justify-center gap-10 py-10 transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={image}
              alt="Conferencista"
              className="h-96 w-96 rounded-3xl object-cover max-sm:h-64 max-sm:w-64"
            />
            <div className="flex max-w-[90vw] flex-col gap-6 rounded-xl bg-white p-6 md:max-w-[800px]">
              <div className="flex flex-col">
                <p className="text-3xl font-bold text-primary-dark-green">
                  {conferenceActive.name}
                </p>
                <p className="text-2xl text-gray-700">
                  {conferenceActive.work}, {conferenceActive.place}
                </p>
              </div>
              <div
                className="max-h-[200px] min-h-[150px] w-full overflow-y-auto overflow-x-hidden"
                ref={detailsDivRef}
              >
                <p className="whitespace-pre-wrap break-words text-justify text-gray-800">
                  {conferenceActive.info}
                </p>
              </div>
              <div className="flex gap-10">
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
    </div>
  );
}
