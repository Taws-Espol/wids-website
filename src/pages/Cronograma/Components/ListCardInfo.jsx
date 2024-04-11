import { Label } from "./Label";
import { useState } from "react";
import { CardInfo } from "./CardInfo";

export function ListCardInfo({LabelInfo,InfoCard}){
    const [hiddenConfe,setHiddenConfe] = useState(true);

    const changeHiddenConfeValue = () => {
        setHiddenConfe(!hiddenConfe);
    };

    const [hiddenTall,setHiddenTall] = useState(true);

    const changeHiddenTallValue = () => {
        setHiddenTall(!hiddenTall);
    };

    return(
        <div className=" flex flex-col gap-15">
            <Label type={LabelInfo.type} hiddenDiv={changeHiddenConfeValue}/>
            <div className=" flex flex-col py-4">
                <CardInfo
                    type={InfoCard.type}
                    title={InfoCard.title}
                    info={InfoCard.info}
                />
            </div>
        </div>
    )
}