import React, { useState } from "react";
import {ButtonEditionComponents} from './ButtonEditionComponents.jsx';
import EventBox from "./EventBox";
import { CardInfoEdition } from "./CardInfoEdition.jsx";

export function EditionContainer({edicionData}){
    const [active,setActive] = useState('Cronograma');

    const changeButton = (place)=>{
        setActive(place);
    };
    
    return(
        <>
            <div className="flex flex-wrap gap-5 max-lg:flex-col max-lg:place-content-center max-lg:place-items-center"> 
                <ButtonEditionComponents key='1' text='Cronograma' changeButton={() => changeButton('Cronograma')}/>
                <div></div>
                <ButtonEditionComponents key='2' text='Conferencistas'changeButton={()=>changeButton('Conferencista')}/>
                <div></div>
                <ButtonEditionComponents key='3'  text='Talleres'changeButton={()=>changeButton('Talleres')}/>
                <div></div>
            </div>
            <div className={`${active=='Cronograma' ? 'block':'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                <h3 className="text-2xl text-primary-dark-green font-bold">Cronograma</h3>
                {edicionData &&
                                edicionData.cronograma.map((evento, index) => (
                                    <CardInfoEdition type='Cronograma' title={evento.nombre} info={evento.descripcion} />
                                ))
                }
            </div>
            <div className={`${active=='Conferencista' ? 'block':'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                <h3 className="text-2xl text-primary-dark-green font-bold">Conferencistas</h3>
            </div>
            <div className={`${active=='Talleres' ? 'block':'hidden'} flex place-content-center place-items-center flex-col my-5 gap-10`}>
                <h3 className="text-2xl text-primary-dark-green font-bold">Talleres</h3>
                {edicionData &&
                                edicionData.talleres.map((evento, index) => (
                                    <CardInfoEdition type='Talleres' title={evento.nombre} info={evento.descripcion} />
                                ))
                }
            </div>
        </>
    );
}