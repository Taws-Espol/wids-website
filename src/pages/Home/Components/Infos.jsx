import {Contador} from "./Contador";
export function Infos() {
    return (
        <div className="relative flex flex-row max-xl:flex-wrap place-content-center place-items-center p-5 md:w-[1000px] font-acumin gap-0 xl:pb-48 max-xl:gap-10">
                <Contador number={5} text={"Edición"} color="text-primary-green" className="xl:absolute xl:top-[5px] xl:left-[80px]" position={"ta"}/>
                <Contador number={12} text={"Conferencistas"} color="text-primary-blue" className="xl:absolute xl:top-[50px] xl:left-[280px]"/>
                <Contador number={"+20"} text={"Areas Involucradas"} color="text-primary-orange" className="xl:absolute xl:top-[100px] xl:left-[480px]"/>
                <Contador number={2200} text={"Visualizaciones en Youtube"} color="text-primary-dark-green" className="xl:absolute xl:top-[150px] xl:left-[730px]"/>
        </div>
    );
};

