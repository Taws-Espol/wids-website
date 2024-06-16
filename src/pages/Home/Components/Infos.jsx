import {Contador} from "./Contador";
export function Infos() {
    return (
        <div className="relative flex flex-row max-md:flex-wrap place-content-center place-items-center pb-[10vw] p-5 md:w-[1000px] font-acumin gap-[5vw] md:pb-48 md:gap-0 select-none">
                <Contador number={5} text={"Edición"} color="text-primary-green" className="md:relative md:top-[1vw] md:right-[6.5vw]" position={"ta"}/>
                <Contador number={12} text={"Conferencistas"} color="text-primary-blue" className="md:relative md:top-[5vw] md:left-[0.5vw]"/>
                <Contador number={"+20"} text={"Áreas Involucradas"} color="text-primary-orange" className="md:relative md:top-[10vw] md:left-[6.5vw]"/>
                <Contador number={2200} text={"Visualizaciones en Youtube"} color="text-primary-dark-green" className="md:relative md:top-[15vw] md:left-[12.5vw]"/>
        </div>
    );
};
