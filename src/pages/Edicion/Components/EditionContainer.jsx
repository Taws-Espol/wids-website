import React, { useState } from "react";
import { ButtonEditionComponents } from './ButtonEditionComponents.jsx';
import { CardInfoEdition } from "./CardInfoEdition.jsx";
import {ConferenceContainer} from "../../Conferencistas/Components/ConferencesContainer.jsx"

export function EditionContainer({ edicionData }) {
    const [active, setActive] = useState('Cronograma');
    
    const changeButton = (place) => {
        setActive(place);
    };

    return (
        <>
            <div className="flex flex-wrap gap-5 max-lg:flex-col max-lg:place-content-center max-lg:place-items-center mb-20">
                <ButtonEditionComponents key='1' text='Cronograma' active={active} changeButton={() => changeButton('Cronograma')} />
                <ButtonEditionComponents key='2' text='Conferencistas' active={active} changeButton={() => changeButton('Conferencistas')} />
                <ButtonEditionComponents key='3' text='Talleres' active={active} changeButton={() => changeButton('Talleres')} />
            </div>
            <div className={`${active === 'Cronograma' ? 'block' : 'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                {edicionData &&
                    edicionData.cronograma.map((evento, index) => (
                        <CardInfoEdition key={index} type='Cronograma' evento={evento} />
                    ))
                }
            </div>
            <div className={`${active === 'Conferencistas' ? 'block' : 'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                <ConferenceContainer edicionData={edicionData} />
            </div>
            <div className={`${active === 'Talleres' ? 'block' : 'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                {edicionData &&
                    edicionData.talleres.map((evento, index) => (
                        <CardInfoEdition key={index} type='Talleres' evento={evento} />
                    ))
                }
            </div>
        </>
    );
}
