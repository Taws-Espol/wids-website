import { NextGenInfo } from "../../data/Eventos/NextGen";
import { CardRequirement } from "./Components/CardRequirements";
import { ColBenef } from "./Components/ColBene";
function NextGen() {
    const div1 = NextGenInfo[0];
    const text1 = div1.info[0].split("-");
    const { benefits } = NextGenInfo[1];
    const { title, requirements } = NextGenInfo[2];
    const { alt, link_image, info } = NextGenInfo[3];
    return (
        <div className="w-full flex flex-col place-content-center place-items-center pb-10 font-acumin select-none">
            <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-acumin text-primary-dark-green text-center  lg:text-left py-0 sm:py-5">
                    Next Gen 2024
                </h1>
            </div>
            <div className="w-4/5 h-auto rounded-lg pb-0  flex flex-col place-content-center place-items-center">
                <div id='div_nextgen-empoderando' className="flex max-lg:flex-col max-sm:min-w-[300px] place-content-center place-items-center mb-10 max-sm:gap-10">
                    <div className="w-3/5 flex justify-center items-center text-center relative mt-10">
                        <div id='rectangulo_blue' className="absolute top-[-30px] right-10 w-56 h-56 bg-custom-peach z-10 max-lg:hidden"></div>
                        <div id='circulo-yellow' className="absolute bottom-[-52px] left-5 h-52 w-52 rounded-full bg-custom-purple z-10 max-lg:hidden"></div>
                        <img src={div1.link_image} alt="NextGen-Empoderando a la siguiente generación" className="w-4/5 h-[350px] z-20 max-sm:min-w-[300px] max-sm:h-[200px] max-md:min-w-[550px] max-md:h-[300px] max-lg:min-w-[600px] max-lg:h-[400px] max-lg:rounded-2xl" />
                    </div>
                    <div id='nextgen-empoderando' className="ml-10 text-2xl w-2/5 text-justify px-4 flex flex-col gap-5 max-sm:text-base max-md:text-lg max-lg:text-xl max-lg:w-full max-lg:m-0">
                        <p>
                            {text1[0]}<b>{text1[1]}</b>
                        </p>
                        <p>
                            {div1.info[1]}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row m-8 w-full bg-custom-white rounded-md  py-10">
                    <div className="w-full lg:w-1/2 flex items-center justify-center lg:pl-6 ml-0" >
                        <h1 className="text-center text-primary-dark-green text-5xl lg:text-6xl font-bold py-5 ">{NextGenInfo[1].title}</h1>
                    </div>
                    <div className="w-full lg:w-2/3 mt-8 lg:mt-0">
                        {benefits.map((benefit_each, index) => (
                            <ColBenef key={index} benefit={benefit_each} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-4/5 min-h-96 flex-col flex place-content-center place-items-center mt-0 rounded-3xl pb-5">
                <div className="w-3/5 flex justify-center items-center text-center relative mt-10">
                    <div id='rectangulo' className="absolute top-[40px] left-[-375px] w-full h-9 bg-custom-purpl2 z-10 hidden lg:block lg:left-[-375px] lg:top-[40px] lg:h-9 lg:w-full max-lg:w-1/2 max-lg:h-4 max-lg:left-[-50%]"></div>
                    <div id='rectangulo2' className="absolute top-[72px] right-[-370px] w-full h-9 bg-custom-yel z-10 hidden lg:block lg:right-[-370px] lg:top-[72px] lg:h-9 lg:w-full max-lg:w-1/2 max-lg:h-4 max-lg:right-[-50%]"></div>
                    <h2 className="text-primary-dark-green text-center text-5xl font-bold py-10 relative z-20 text-bold">
                        {title}
                    </h2>
                </div>  
                <div className="flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-1/2">
                        <CardRequirement requirement={requirements[0]} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <CardRequirement requirement={requirements[1]} />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap place-content-center place-items-center text-center w-4/5 py-14 relative max-md:pt-10">
                <div id='div_nextgen-empoderando' className="flex max-lg:flex-col max-sm:min-w-[300px] place-content-center place-items-center">
                    <div id='nextgen-empoderando' className=" ml-10 text-2xl w-2/5 text-justify px-4 flex flex-col gap-5 max-sm:text-base  max-md:text-lg  max-lg:text-xl  max-lg:w-full max-lg:m-0">
                        <p>
                            {info}
                        </p>
                    </div>
                    <div className="w-3/5 flex justify-center items-center text-center relative  mt-10">
                        <div id='rectangulo_blue' className="absolute top-[-30px] left-10 w-56 h-56 bg-custom-peach z-10 max-lg:hidden">
                        </div>
                        <div id='circulo-yellow' className="absolute bottom-[-52px] right-5 h-52 w-52 rounded-full bg-custom-purple z-10 max-lg:hidden">
                        </div>
                        <img src={link_image} alt="NextGen-Empoderando a la siguiente generación" className="w-4/5 h-[350px] z-20 max-sm:min-w-[300px] max-sm:h-[200px] max-md:min-w-[550px] max-md:h-[300px]  max-lg:min-w-[600px] max-lg:h-[400px] max-lg:rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NextGen;