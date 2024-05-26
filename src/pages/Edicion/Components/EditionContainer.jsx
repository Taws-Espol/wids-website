import React, { useState } from "react";
import { ButtonEditionComponents } from './ButtonEditionComponents.jsx';
import { CardInfoEdition } from "./CardInfoEdition.jsx";
import { ProfileCard } from "./ProfileCard.jsx";

export function EditionContainer({ edicionData }) {
    const [active, setActive] = useState('Cronograma');
    const [conferenceActive, setConferenceActive] = useState(null);

    const changeButton = (place) => {
        setActive(place);
    };

    const changeConferenceActive = (conferencista) => {
        setConferenceActive(conferencista);
        setTimeout(() => {
            document.getElementById("details-div").scrollIntoView({ behavior: 'smooth' });
        }, 0);
    };

    return (
        <>
            <div className="flex flex-wrap gap-5 max-lg:flex-col max-lg:place-content-center max-lg:place-items-center">
                <ButtonEditionComponents key='1' text='Cronograma' active={active} changeButton={() => changeButton('Cronograma')} />
                <ButtonEditionComponents key='2' text='Conferencistas' active={active} changeButton={() => changeButton('Conferencistas')} />
                <ButtonEditionComponents key='3' text='Talleres' active={active} changeButton={() => changeButton('Talleres')} />
            </div>
            <div className={`${active === 'Cronograma' ? 'block' : 'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                <h3 className="text-2xl text-primary-dark-green font-bold">Cronograma</h3>
                {edicionData &&
                    edicionData.cronograma.map((evento, index) => (
                        <CardInfoEdition key={index} type='Cronograma' evento={evento} />
                    ))
                }
            </div>
            <div className={`${active === 'Conferencistas' ? 'block' : 'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                <h3 className="text-2xl text-primary-dark-green font-bold">Conferencistas</h3>
                <div className="flex flex-row place-content-center place-items-center gap-10 flex-wrap">
                    {conferenceActive && (
                        <div id="details-div" className="flex flex-row place-content-center place-items-center w-full gap-10">
                            <ProfileCard conferencista={conferenceActive} onClickFunction={changeConferenceActive} />
                            <div className="h-[550px] w-[800px] place-content-center place-items-center rounded-xl overflow-scroll p-10">
                                <p className="px-10 text-justify">
                                    {conferenceActive.info}
                                </p>
                            </div>
                        </div>
                    )}
                    {edicionData &&
                        edicionData.conferencistas.map((conferencista, index) => (
                            <ProfileCard key={index} conferencista={conferencista} onClickFunction={() => changeConferenceActive(conferencista)} active={conferenceActive}/>
                        ))
                    }
                </div>
            </div>
            <div className={`${active === 'Talleres' ? 'block' : 'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
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
