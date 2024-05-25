import { NextGenInfo } from "../../data/Eventos/NextGen";
import { CardBenefit } from "./Components/CardsBenefit";
import { CardRequirement } from "./Components/CardRequirements";
function NextGen() {
    const div1 = NextGenInfo[0];
    const text1 = div1.info[0].split("-");
    const { benefits } = NextGenInfo[1];
    const { title, requirements } = NextGenInfo[2];
    const { alt,link_image, info } = NextGenInfo[3];
    return (
        <div className="w-full flex flex-col place-content-center place-items-center pb-10 font-acumin ">
            <div>
                <h1 className="text-4xl font-bold font-acumin text-primary-dark-green text-center py-5">
                    Next Gen 2024
                </h1>
            </div>
            <div className="w-4/5 h-auto rounded-lg pb-10  flex flex-col place-content-center place-items-center">
                <h2 className="text-4xl font-bold font-acumin text-primary-dark-green py-5 text-center max-sm:text-xl">
                    {div1.title}
                </h2>
                <div id='div_nextgen-empoderando' className="flex max-lg:flex-col max-sm:min-w-[300px] place-content-center place-items-center">
                    <div id='nextgen-empoderando' className=" ml-10 text-2xl w-2/5 text-justify px-4 flex flex-col gap-5 max-sm:text-base  max-md:text-lg  max-lg:text-xl  max-lg:w-full max-lg:m-0">
                        <p>
                            {text1[0]}<b>{text1[1]}</b>
                        </p>
                        <p>
                            {div1.info[1]}
                        </p>
                    </div>
                    <div className="w-3/5 flex justify-center items-center text-center relative  mt-10">
                        <div id='rectangulo_blue' className="absolute bottom-[-30px] left-10 w-24 h-60 bg-primary-blue z-10 max-lg:hidden">
                        </div>
                        <div id='rectangulo_green' className="absolute bottom-[-30px] right-12 h-24 w-60 bg-primary-green z-10 max-lg:hidden">
                        </div>
                        <div id='circulo-yellow' className="absolute top-[-60px] right-10 h-52 w-52 rounded-full bg-primary-yellow z-10 max-lg:hidden">
                        </div>
                        <img src={div1.link_image} alt="NextGen-Empoderando a la siguiente generación" className="w-4/5 h-[350px] z-20 max-sm:min-w-[300px] max-sm:h-[200px] max-md:min-w-[550px] max-md:h-[300px]  max-lg:min-w-[600px] max-lg:h-[400px] max-lg:rounded-2xl" />
                    </div>
                </div>
                <div className="w-4/5 flex-col flex place-content-center place-items-center mt-20 bg-primary-green rounded-3xl">
                    <h2 className="text-primary-dark-green text-4xl font-bold py-10">
                        {NextGenInfo[1].title}
                    </h2>
                    <div className="flex flex-wrap place-content-around place-items-center w-ful gap-20 pb-5">
                        {benefits.map((benefit_each, index) => (
                            <CardBenefit key={index} benefit={benefit_each} />
                        ))}
                    </div>
                </div>
                <div className="w-4/5 min-h-96 flex-col flex place-content-center place-items-center mt-5 bg-secondary-orange rounded-3xl pb-20">
                    <h2 className="text-primary-dark-green text-center text-4xl font-bold py-10">
                        {title}
                    </h2>
                    <div className="flex place-content-around place-items-center flex-wrap max-sm:flex-col max-sm:gap-5 select-none">
                        <CardRequirement requirement={requirements[0]}/>
                        <img src={requirements[1].imagen_r} alt={requirements[1].imagen_r}  className="max-w-full max-h-60 h-auto object-contain"/>
                        <CardRequirement requirement={requirements[1]}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap place-content-center place-items-center text-center w-4/5 py-20 relative max-md:pt-10">
                <div id='circulo-green' className="absolute top[-50px] left-12 h-[450px] w-[450px] rounded-full bg-primary-acc-green z-10 max-lg:hidden">
                </div>
                <img src={link_image} alt={alt}  className="w-1/2 h-96 rounded-3xl z-20 max-sm:w-[300px]"/>
                <div className="max-w-[300px] flex rounded-3xl bg-secondary-yellow ml-20 p-4 max-lg:m-0  select-none">
                    <p className="text-center text-2xl font-acumin">
                            {info}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NextGen;