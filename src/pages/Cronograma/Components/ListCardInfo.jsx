import { Label } from "./Label";
import { useState } from "react";
import { CardInfo } from "./CardInfo";
import {cronograma} from "../../../data/Cronograma.js";
import { Switch } from "@material-tailwind/react";

export function ListCardInfo({typeLabel}){
    const [hidden,setHidden] = useState(false);

    const changeHiddenValue = () => {
        setHidden(!hidden);
    };

    let listaEventos; 
    switch(typeLabel){
        case "Conferencias":
            listaEventos = cronograma.Conferencias;
            break;
        case "Talleres":
            listaEventos= cronograma.Talleres;
            break;
        default :
            listaEventos= cronograma.Conferencias;
            break;
    }

    return(
        <div className=" flex flex-col gap-15">
            <Label type={typeLabel} hiddenDiv={changeHiddenValue}/>
            <div className={`${hidden ? 'hidden':'block'} flex flex-col py-4 gap-4`}>
            {
                listaEventos.map((evento)=>
                    <CardInfo
                        type={evento.type}
                        title={evento.title}
                        info={evento.info}
                    />
                )
            }
            </div>
        </div>
    )
}