import { NextGenInfo } from "./../../../data/Eventos/NextGen";
import AnimatedSection from "./../../../shared/AnimatedSection";
import { CardRequirement } from "./Components/CardRequirements";
import { ColBenef } from "./Components/ColBene";
import {CardInfoEdition} from "./../../Edicion/Components/CardInfoEdition";
import { ediciones } from "./../../../data/ediciones";
function NextGen() {
    const div1 = NextGenInfo[0];
    const text1 = div1.info[0].split("-");
    const { benefits } = NextGenInfo[1];
    const { title, requirements } = NextGenInfo[2];
    const { alt, link_image, info } = NextGenInfo[3];

	const edicionData = ediciones.find((edicion) => edicion.edicion == 2024);

    return (
        <AnimatedSection>
            <div className="w-full flex flex-col place-content-center place-items-center pb-10 font-acumin select-none">
                <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
                    <h1 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-acumin text-primary-dark-green text-center  lg:text-left py-0 sm:py-5">
                        Next Gen 2024
                    </h1>
                </div>
                <div className="w-4/5 h-auto rounded-lg pb-0  flex flex-col place-content-center place-items-center">
                    <div id='div_nextgen-empoderando' className="flex max-lg:flex-col max-sm:min-w-[300px] place-content-center place-items-center mb-10 max-sm:gap-10">
                        <div className="w-3/5 flex justify-center items-center text-center relative mt-10 pb-0 sm:pb-14 md:pb-14 lg:pb-0 ">
                            <div id='rectangulo_blue'
                                className="absolute top-[-18px] right-[-60px] w-36 h-28 bg-custom-peach z-10 
        sm:w-48 sm:h-48 sm:top-[-30px] sm:right-[-135px]
        md:w-64 md:h-64 md:top-[-30px] md:right-[-140px]
        lg:w-56 lg:h-56 lg:top-[-30px] lg:right-10">
                            </div>
                            <div id='circulo-yellow'
                                className="absolute bottom-[-30px] left-[-72px] h-28 w-28 rounded-full bg-custom-purple z-10 
        sm:h-48 sm:w-48 sm:bottom-[10px] sm:left-[-145px]
        md:h-48 md:w-48 md:bottom-[10px] md:left-[-165px]
        lg:h-52 lg:w-52 lg:bottom-[-52px] lg:left-5">
                            </div>
                            <img src={div1.link_image}
                                alt="NextGen-Empoderando a la siguiente generación"
                                className="w-4/5 h-[350px] z-20 
        max-sm:min-w-[300px] max-sm:h-[200px] 
        max-md:min-w-[550px] max-md:h-[300px] 
        max-lg:min-w-[600px] max-lg:h-[400px] " />
                        </div>
                        <div id='nextgen-empoderando' className="ml-10 text-2xl w-2/5 text-justify px-4 flex flex-col gap-5 max-sm:text-base max-md:text-lg max-lg:text-xl max-lg:w-full max-lg:m-0">
                            <p className="font-acumin">
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
                        <div className="w-3/5 flex justify-center items-center text-center relative mt-10">
                            <div id='rectangulo_blue'
                                className="absolute top-[-18px] left-[-60px] w-36 h-28 bg-custom-peach z-10 
        sm:w-48 sm:h-48 sm:top-[-25px] sm:left-[-125px]
        md:w-64 md:h-64 md:top-[-30px] md:left-[-140px]
        lg:w-56 lg:h-56 lg:top-[-30px] lg:left-10">
                            </div>
                            <div id='circulo-yellow'
                                className="absolute bottom-[-35px] right-[-65px] h-28 w-28 rounded-full bg-custom-purple z-10 
        sm:h-48 sm:w-48 sm:bottom-[-50px] sm:right-[-150px]
        md:h-48 md:w-48 md:bottom-[-60px] md:right-[-165px]
        lg:h-52 lg:w-52 lg:bottom-[-52px] lg:right-5">
                            </div>
                            <img src={link_image}
                                alt="NextGen-Empoderando a la siguiente generación"
                                className="w-4/5 h-[350px] z-20 
        max-sm:min-w-[300px] max-sm:h-[200px] 
        max-md:min-w-[550px] max-md:h-[300px] 
        max-lg:min-w-[600px] max-lg:h-[400px]" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex place-content-center place-items-center flex-col my-5 gap-10`}>
                    <p className="font-acumin text-primary-dark-green font-bold text-5xl">
                        Cromograma
                    </p>
                {edicionData &&
                    edicionData.talleres.map((evento, index) => (
                        <CardInfoEdition key={index} type='Talleres' evento={evento} year={2024} index={index} />
                    ))
                }
            </div>
        </AnimatedSection>
    );
}

export default NextGen;
