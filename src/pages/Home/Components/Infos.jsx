import {Contador} from "./Contador";
export function Infos() {
    return (
        <div className="relative flex flex-row max-xl:flex-wrap place-content-center place-items-center p-5 md:w-[1000px] font-acumin gap-0 xl:pb-48 max-xl:gap-10">
                <Contador number={38} text={"Lectures"} color="text-primary-green" className="xl:absolute xl:top-[5px] xl:left-[80px]"/>
                <Contador number={15} text={"Speakers"} color="text-primary-blue" className="xl:absolute xl:top-[50px] xl:left-[280px]"/>
                <Contador number={18} text={"Master-Classes"} color="text-primary-orange" className="xl:absolute xl:top-[100px] xl:left-[480px]"/>
                <Contador number={2500} text={"Participants"} color="text-primary-dark-green" className="xl:absolute xl:top-[150px] xl:left-[700px]"/>
        </div>
    );
};

