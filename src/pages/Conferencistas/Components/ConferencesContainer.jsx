import React, { useState } from "react";
import { ProfileCard } from "./../../Edicion/Components/ProfileCard";
import { Tooltip } from "@material-tailwind/react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function ConferenceContainer({ edicionData, campo= "conferencistas" }) {
    const [active, setActive] = useState('Cronograma');
    const [conferenceActive, setConferenceActive] = useState(null);

    const changeConferenceActive = (conferencista) => {
        setConferenceActive(conferencista);
        setTimeout(() => {
            document.getElementById("details-div").scrollIntoView({ behavior: 'smooth' });
        }, 0);
    };

    let link = {
        '2020': '/assets/Eventos/Ediciones/2020/Images/conferencistas/',
        '2021': '/assets/Eventos/Ediciones/2021/Images/conferencistas/',
        '2022': '/assets/Eventos/Ediciones/2022/Images/conferencistas/',
        '2023': '/assets/Eventos/Ediciones/2023/Images/conferencistas/',
        '2024': '/assets/Eventos/Ediciones/2024/Images/conferencistas/',
    };
    let edition = edicionData.edicion;
    const path_conferencistas = link[edition];
    let imganName = conferenceActive && conferenceActive.imageName;
    let image = path_conferencistas + imganName;

    return (
        <>
            <div className="font-acumin flex flex-row place-content-center place-items-center gap-10 flex-wrap">
                {conferenceActive && (
                    <div id="details-div" className="flex flex-row flex-wrap place-content-center place-items-center w-full gap-10 my-20 py-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-2xl">
                        <img src={image} alt="Conferencista" className="h-96 w-96  max-sm:w-80 max-sm:h-80 object-cover rounded-3xl" />
                        <div className="flex flex-col h-[384px] w-[800px] max-sm:w-[350px] justify-center align-middle rounded-xl p-10 gap-8">
                            <div className="flex flex-col max-sm:mt-10">
                                <p className="text-primary-dark-green font-bold text-3xl">{conferenceActive.name}</p>
                                <p className="text-2xl">{conferenceActive.work}, {conferenceActive.place}</p>
                            </div>
                            <div className="flex place-content-start w-9/10 min-h-[200px] overflow-scroll">
                                <p className="text-justify">
                                    {conferenceActive.info}
                                </p>
                            </div>
                            <div className="flex gap-20">
                                {conferenceActive.linkeding && (
                                    <Tooltip content="Follow on LinkedIn">
                                        <a href={conferenceActive.linkeding} target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin size={30} />
                                        </a>
                                    </Tooltip>
                                )}
                                {conferenceActive.x && (
                                    <Tooltip content="Follow on X">
                                        <a href={conferenceActive.x} target="_blank" rel="noopener noreferrer">
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
