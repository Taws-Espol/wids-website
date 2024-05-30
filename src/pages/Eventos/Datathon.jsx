import { DatathonInfo } from "../../data/Eventos/Datathon";
import {HackatonDay} from "./Components/HackatonDay";
function Datathon() {
    const div1 = DatathonInfo[0];
    const words = div1.words
    const div2  = DatathonInfo[1];
    const infos_dvi2 = div2.infos;
    const div3 = DatathonInfo[2];
    const requirements = div3.requirements;
    const div4 = DatathonInfo[3];
    const div5 = DatathonInfo[4];
    return (
        <div className="w-full  select-none flex flex-col pb-10 font-sans max-sm:text-base">
            <div>
                <h1 className="text-8xl font-bold font-sans text-left text-primary-dark-green py-5 pl-10 sm:pl-20 md:pl-30 lg:pl-40 xl:pl-50 2xl:pl-60">
                    Datathon 
                </h1>
            </div>
            <div className="relative flex justify-center items-center h-[700px] max-sm:h-[650px] max-md:h-[750px] max-lg:h-[400px] max-xl:h-[500px] max-2xl:h-[600px] pb-10 bg-yellow-500 text-primary-dark-green">
                <div className="absolute top-[40px] left-20 text-9xl max-md:hidden max-lg:text-5xl max-lg:left-10 max-lg:top-[30px] max-xl:text-7xl max-xl:left-5 max-2xl:text-8xl">
                    <p className="font-bold text-[60px]">
                        {div1.title}
                    </p>
                </div>
                { 
                 /*
                <div className="absolute top-[160px] left-20 text-9xl max-md:hidden max-lg:text-5xl max-lg:top-[80px] max-lg:left-44 max-xl:text-7xl max-xl:left-44 max-xl:top-[100px] max-2xl:text-8xl max-2xl:left-48 max-2xl:top-[120px]">
                    <p className="font-bold">
                        {words[1]}
                    </p>
                </div>
                <div className="absolute top-[300px] left-20 right-44 text-9xl max-md:hidden max-lg:text-5xl max-lg:top-[130px] max-lg:right-44 max-xl:text-7xl max-xl:right-36 max-xl:top-[170px] max-2xl:text-8xl max-2xl:right-44 max-2xl:top-[210px]">
                    <p className="font-bold">
                        {words[2]}
                    </p>
                </div>
                <div className="absolute top-[440px] left-20 right-20 text-9xl max-md:hidden max-lg:text-5xl max-lg:top-[180px] max-lg:right-10 max-xl:text-7xl max-xl:right-5 max-xl:top-[240px] max-2xl:text-8xl max-2xl:right-20 max-2xl:top-[300px]">
                    <p className="font-bold">
                        {words[3]}
                    </p>
                </div>
                */}
                <div className="flex px-5  pt-5 text-center place-content-center place-items-center text-2xl font-bold md:hidden max-sm:text-2xl max-md:text-3xl" >
                    <p>
                        {div1.title}
                    </p>
                </div>
                <div>
                </div>
                <div className="flex flex-wrap place-content-center w-full absolute bottom-14 text-2xl gap-10 ml-10 max-md:m-0 max-md:flex-col max-sm:gap-5 max-md:gap-10 max-sm:text-lg max-md:text-2xl max-lg:bottom-10">
                    <button className="text-white bg-green-900 select-none rounded-2xl px-10 py-3 text-center text-2xl font-sans font-medium max-md:text-lg max-md:px-4"
                        onClick={() => window.open(div1.linkform, '_blank')}
                    >Registrate Aquí</button>
                </div>
                <div className="md:absolute right-12 max-md:right-0 max-md:flex max-md:place-content-right max-md:place-items-right max-md:pt-5 max-xl:top-1 justify-end">
                    <img src="/src/assets/Eventos/Datathon/data_portada.webp" alt="Logo"  className={`max-w-full max-h-[700px] h-auto object-contain shadow-2xl max-md:max-h-44 max-lg:max-h-32 max-xl:h-40 rounded-full`} />
                </div>'
            </div>
           
            <div>
                ..

            </div>
            <div className=" w-4/5 m-w-[500px] border-l-secondary-green border-y-secondary-blue border-r-secondary-yellow  font-sans border-4 py-10 flex flex-col place-content-center place-items-center rounded-3xl gap-5">
                <p className="text-primary-dark-green text-4xl font-bold text-center py-10">
                    {div2.title}
                </p>
                <div className="flex flex-wrap w-10/12 max-sm:flex-col max-sm:place-content-center max-sm:place-items-center max-sm:gap-5 place-content-around bg-gradient-to-br from-secondary-green via-primary-blue to-secondary-yellow rounded-3xl py-10">
                    <div className="w-5/12 min-w-[250px] flex place-content-start place-items-center justify-start text-3xl text-center">
                        <p className="px-4">
                            {div2.msg}
                        </p>
                    </div>
                    <div className="flex flex-wrap w-6/12 gap-5 place-content-center place-items-center text-center">
                        <p className="py-4 px-5 bg-white bg-opacity-20 rounded-sm">{infos_dvi2[0]}</p>
                        <p className="py-4 px-5 bg-white bg-opacity-20 rounded-sm">{infos_dvi2[1]}</p>
                        <p className="py-4 px-5 bg-white bg-opacity-20 rounded-sm">{infos_dvi2[2]}</p>
                        <p className="py-4 px-5 bg-white bg-opacity-20 rounded-sm">{infos_dvi2[3]}</p>
                    </div>
                </div>
            </div>
            <div className="mt-20 w-4/5 flex flex-wrap place-content-around place-items-center text-center text-2xl max-md:flex-col max-md:place-content-center max-md:place-items-center max-sm:text-lg max-md:text-center max-md:gap-5">
                <div className="md:hidden text-4xl font-bold text-primary-dark-green text-center px-5 max-sm:place-content-center max-sm:place-items-center max-sm:pb-5 ">
                    <p className="text-center">
                        {div3.title}
                    </p>
                </div>
                <div className="py-5 px-10 w-4/12 rounded-3xl  border-l-secondary-green border-y-secondary-blue border-r-secondary-yellow border-4 h-72 gap-5 flex flex-col place-content-center place-items-center text-justify max-sm:w-[300px] max-md:w-[400px] max-xl:w-[300px] max-xl:h-[400px]" >
                    <h3 className="text-3xl">
                        {requirements[0].title}
                    </h3>
                    <p>
                        {requirements[0].info}
                    </p>
                </div>
                <div className="text-4xl font-bold text-primary-dark-green w-4/12 text-center px-5 max-md:hidden" >
                    <p>
                        {div3.title}
                    </p>
                </div>
                <div className="py-5 px-10 w-4/12 rounded-3xl  border-l-secondary-green border-y-secondary-blue border-r-secondary-yellow border-4 h-72 gap-5 flex flex-col place-content-center place-items-center text-justify max-sm:w-[300px] max-md:w-[400px] max-xl:w-[300px] max-xl:h-[400px]" >
                    <h3 className="text-3xl">
                        {requirements[1].title}
                    </h3>
                    <p>
                        {requirements[1].info}
                    </p>
                </div>
                <div className="py-5 px-10 w-4/12 rounded-3xl  border-l-secondary-green border-y-secondary-blue border-r-secondary-yellow border-4 h-72 gap-5 flex flex-col place-content-center place-items-center text-justify max-sm:w-[300px] max-md:w-[400px] max-xl:w-[300px] max-xl:h-[400px]"  >
                    <h3 className="text-3xl">
                        {requirements[2].title}
                    </h3>
                    <p>
                        {requirements[2].info[0]}
                        <a href={requirements[2].linkform} target="_blank" className="text-primary-dark-green">{requirements[2].info[1]}</a>
                    </p>
                </div>
            </div>
            <div className=" w-4/5 m-w-[500px] border-l-secondary-green border-y-secondary-blue border-r-secondary-yellow  font-sans border-4 py-10 flex flex-col place-content-center place-items-center rounded-3xl gap-5 mt-10">
                <div className="flex flex-wrap w-10/12 max-sm:flex-col max-sm:place-content-center max-sm:place-items-center max-sm:gap-5 place-content-around bg-gradient-to-br from-secondary-green via-primary-blue to-secondary-yellow rounded-3xl py-10">
                    <div className="w-4/5 min-w-[250px] flex place-content-start place-items-center justify-start text-3xl text-center">
                        <p className="px-10 text-justify">
                            {div4.msg}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-4/5 flex flex-col text-2xl mt-20 place-content-center  place-items-center">
                <h3 className="font-bold text-primary-dark-green  text-3xl text-center">
                    {div5.title}
                </h3>
                {div5.crono.map((day,index) => (<HackatonDay key={index} dayHackaton={day}/>) )}
            </div>
        </div>
    );
}

export default Datathon;