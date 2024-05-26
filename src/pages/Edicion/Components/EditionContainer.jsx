import React, { useState } from "react";
import { ButtonEditionComponents } from './ButtonEditionComponents.jsx';
import { CardInfoEdition } from "./CardInfoEdition.jsx";
import { ProfileCard } from "./ProfileCard.jsx";

export function EditionContainer({ edicionData }) {
    const [active, setActive] = useState('Cronograma');

    const changeButton = (place) => {
        setActive(place);
    };
    const [conferenceActive, setconferenceActive] = useState(null);

    const changeconferenceActive = (conferencista) => {
        setconferenceActive(conferencista);
    };
    return (
        <>
            <div className="flex flex-wrap gap-5 max-lg:flex-col max-lg:place-content-center max-lg:place-items-center">
                <ButtonEditionComponents key='1' text='Cronograma' active={active} changeButton={() => changeButton('Cronograma')} />
                <div></div>
                <ButtonEditionComponents key='2' text='Conferencistas' active={active} changeButton={() => changeButton('Conferencistas')} />
                <div></div>
                <ButtonEditionComponents key='3' text='Talleres' active={active} changeButton={() => changeButton('Talleres')} />
                <div></div>
            </div>
            <div className={`${active == 'Cronograma' ? 'block' : 'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                <h3 className="text-2xl text-primary-dark-green font-bold">Cronograma</h3>
                {edicionData &&
                    edicionData.cronograma.map((evento, index) => (
                        <CardInfoEdition key={index} type='Cronograma' evento={evento} />
                    ))
                }
            </div>
            <div className={`${active == 'Conferencistas' ? 'block' : 'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                <h3 className="text-2xl text-primary-dark-green font-bold">Conferencistas</h3>
                <div className="flex flex-row place-content-center place-items-center gap-10 flex-wrap">
                    {
                        conferenceActive && <div className="flex flex-row place-content-center place-items-center w-full gap-10 ">
                            <ProfileCard conferencista={conferenceActive} onClickFunction={changeconferenceActive} />
                            <div className="h-[550px] w-[800px] place-content-center place-items-center hover:border-4 rounded-xl hover:border-primary-blue overflow-scroll p-10" >
                                <p className="px-10 text-justify">
                                    {conferenceActive.info}
                                </p>
                            </div>
                        </div>
                    }
                    {edicionData &&
                        edicionData.conferencistas.map((conferencista, index) => (
                            <ProfileCard key={index} conferencista={conferencista} onClickFunction={changeconferenceActive} />
                        ))
                    }
                </div>
            </div>
            <div className={`${active == 'Talleres' ? 'block' : 'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                <h3 className="text-2xl text-primary-dark-green font-bold">Talleres</h3>
                {edicionData &&
                    edicionData.talleres.map((evento, index) => (
                        <CardInfoEdition key={index} type='Talleres' evento={evento} />
                    ))
                }
            </div>
        </>
    );
}
