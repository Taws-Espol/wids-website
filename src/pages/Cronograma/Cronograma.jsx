import { ButtonEditionComponents } from '../Edicion/Components/ButtonEditionComponents';
import { useState } from 'react';
import {TimeLine}  from './Components/TimeLine';
import 'react-vertical-timeline-component/style.min.css';
import { cronograma } from "../../data/Cronograma";
function Cronograma() {
    const [active, setActive] = useState('Conferencias');

    const changeButton = (place) => {
        setActive(place);
    };

    return (
        <div className="flex flex-col place-content-center place-items-center gap-10 select-none">
            <h1 className="text-4xl text-primary-dark-green font-acumin pt-5 font-bold">Cronograma</h1>
            <div className="flex flex-wrap place-content-center  max-lg:gap-10 gap-4 px-4 pb-20 select-none">
                <ButtonEditionComponents key='1' text='Conferencias' active={active} changeButton={() => changeButton('Conferencias')} />
            </div>
            <div className='w-full'>
                {<TimeLine Data={cronograma} active={active}/>}
            </div>
        </div>
    );
}

export default Cronograma;
