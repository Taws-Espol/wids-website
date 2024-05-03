import {NextGenInfo} from "../../data/Eventos/NextGen"
function NextGen() {
    const div1  = NextGenInfo[0];
    let text1 = div1.info[0].split("-")
	return (
        <div className="w-full flex flex-col place-content-center place-items-center pb-4">
            <div>
                <h1 className="text-4xl font-bold font-acumin text-primary-dark-green text-center py-5">
                    Next Gen 2024
                </h1>
            </div>
            <div className="w-4/5 h-auto bg-gradient-to-b from-primary-blue to-secondary-blue rounded-lg pb-10 flex-col place-content-center place-items-center">
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
                    <div className="w-3/5 flex justify-center items-center text-center relative max-lg:mt-10">
                        <div id='rectangulo_blue' className="absolute bottom-[-30px] left-10 w-24 h-60 bg-primary-blue z-10 max-lg:hidden">
                        </div>
                        <div id='rectangulo_green' className="absolute bottom-[-30px] right-12 h-24 w-60 bg-primary-green z-10 max-lg:hidden">
                        </div>
                        <div id='circulo-yellow' className="absolute top-[-60px] right-10 h-52 w-52 rounded-full bg-primary-yellow z-10 max-lg:hidden">
                        </div>
                        <img src={div1.link_image} alt="NextGen-Empoderando a la siguiente generación" className="w-4/5 h-[350px] z-20 max-sm:min-w-[300px] max-sm:h-[200px] max-md:min-w-[550px] max-md:h-[300px]  max-lg:min-w-[600px] max-lg:h-[400px] max-lg:rounded-2xl"/>
                    </div>
                </div>
            </div>

        </div>
	);
}

export default NextGen;