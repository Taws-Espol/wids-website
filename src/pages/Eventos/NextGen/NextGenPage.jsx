import { NextGenInfo } from './../../../data/Eventos/NextGen';
import AnimatedSection from './../../../shared/AnimatedSection';
import { CardRequirement } from './Components/CardRequirements';
import { ColBenef } from './Components/ColBene';
import { CardInfoEdition } from './../../Edicion/Components/CardInfoEdition';
import { ediciones } from './../../../data/ediciones';
import { ConferenceContainer } from './../../Conferencistas/Components/ConferencesContainer';
function NextGen() {
  const div1 = NextGenInfo[0];
  const text1 = div1.info[0].split('-');
  const { benefits } = NextGenInfo[1];
  const { title, requirements } = NextGenInfo[2];
  const { alt, link_image, info } = NextGenInfo[3];

  const edicionData = ediciones.find((edicion) => edicion.edicion == 2024);

  return (
    <AnimatedSection>
      <div className="flex w-full select-none flex-col place-content-center place-items-center overflow-x-hidden pb-10 font-acumin">
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
          <h1 className="py-0 text-center font-acumin text-5xl font-bold text-primary-dark-green sm:py-5 sm:text-3xl md:text-4xl lg:text-left lg:text-5xl xl:text-6xl">
            Next Gen 2024
          </h1>
        </div>
        <div className="flex h-auto w-4/5 flex-col place-content-center place-items-center rounded-lg pb-0">
          <div
            id="div_nextgen-empoderando"
            className="mb-10 flex place-content-center place-items-center max-lg:flex-col max-sm:min-w-[300px] max-sm:gap-10"
          >
            <div className="relative mt-10 flex w-3/5 items-center justify-center pb-0 text-center sm:pb-14 md:pb-14 lg:pb-0">
              <div
                id="rectangulo_blue"
                className="absolute right-[-60px] top-[-18px] z-10 h-28 w-36 bg-custom-peach sm:right-[-135px] sm:top-[-30px] sm:h-48 sm:w-48 md:right-[-140px] md:top-[-30px] md:h-64 md:w-64 lg:right-10 lg:top-[-30px] lg:h-56 lg:w-56"
              ></div>
              <div
                id="circulo-yellow"
                className="absolute bottom-[-30px] left-[-72px] z-10 h-28 w-28 rounded-full bg-custom-purple sm:bottom-[10px] sm:left-[-145px] sm:h-48 sm:w-48 md:bottom-[10px] md:left-[-165px] md:h-48 md:w-48 lg:bottom-[-52px] lg:left-5 lg:h-52 lg:w-52"
              ></div>
              <img
                src={div1.link_image}
                alt="NextGen-Empoderando a la siguiente generación"
                className="z-20 h-[350px] w-4/5 max-lg:h-[400px] max-lg:min-w-[600px] max-md:h-[300px] max-md:min-w-[550px] max-sm:h-[200px] max-sm:min-w-[300px]"
              />
            </div>
            <div
              id="nextgen-empoderando"
              className="ml-10 flex w-2/5 flex-col gap-5 px-4 text-justify text-2xl max-lg:m-0 max-lg:w-full max-lg:text-xl max-md:text-lg max-sm:text-base"
            >
              <p className="font-acumin">
                {text1[0]}
                <b>{text1[1]}</b>
              </p>
              <p>{div1.info[1]}</p>
            </div>
          </div>
          <div className="m-8 flex w-full flex-col rounded-md bg-custom-white py-10 lg:flex-row">
            <div className="ml-0 flex w-full items-center justify-center lg:w-1/2 lg:pl-6">
              <h1 className="py-5 text-center text-5xl font-bold text-primary-dark-green lg:text-6xl">
                {NextGenInfo[1].title}
              </h1>
            </div>
            <div className="mt-8 w-full lg:mt-0 lg:w-2/3">
              {benefits.map((benefit_each, index) => (
                <ColBenef key={index} benefit={benefit_each} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-0 flex min-h-96 w-4/5 flex-col place-content-center place-items-center rounded-3xl pb-5">
          <div className="relative mt-10 flex w-3/5 items-center justify-center text-center">
            <div
              id="rectangulo"
              className="absolute left-[-375px] top-[40px] z-10 hidden h-9 w-full bg-custom-purpl2 max-lg:left-[-50%] max-lg:h-4 max-lg:w-1/2 lg:left-[-375px] lg:top-[40px] lg:block lg:h-9 lg:w-full"
            ></div>
            <div
              id="rectangulo2"
              className="absolute right-[-370px] top-[72px] z-10 hidden h-9 w-full bg-custom-yel max-lg:right-[-50%] max-lg:h-4 max-lg:w-1/2 lg:right-[-370px] lg:top-[72px] lg:block lg:h-9 lg:w-full"
            ></div>
            <h2 className="text-bold relative z-20 py-10 text-center text-5xl font-bold text-primary-dark-green">
              {title}
            </h2>
          </div>
          <div className="flex w-full flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <CardRequirement requirement={requirements[0]} />
            </div>
            <div className="w-full md:w-1/2">
              <CardRequirement requirement={requirements[1]} />
            </div>
          </div>
        </div>
        <div className="relative flex w-4/5 flex-wrap place-content-center place-items-center py-14 text-center max-md:pt-10">
          <div
            id="div_nextgen-empoderando"
            className="flex place-content-center place-items-center max-lg:flex-col max-sm:min-w-[300px]"
          >
            <div
              id="nextgen-empoderando"
              className="ml-10 flex w-2/5 flex-col gap-5 px-4 text-justify text-2xl max-lg:m-0 max-lg:w-full max-lg:text-xl max-md:text-lg max-sm:text-base"
            >
              <p>{info}</p>
            </div>
            <div className="relative mt-10 flex w-3/5 items-center justify-center text-center">
              <div
                id="rectangulo_blue"
                className="absolute left-[-60px] top-[-18px] z-10 h-28 w-36 bg-custom-peach sm:left-[-125px] sm:top-[-25px] sm:h-48 sm:w-48 md:left-[-140px] md:top-[-30px] md:h-64 md:w-64 lg:left-10 lg:top-[-30px] lg:h-56 lg:w-56"
              ></div>
              <div
                id="circulo-yellow"
                className="absolute bottom-[-35px] right-[-65px] z-10 h-28 w-28 rounded-full bg-custom-purple sm:bottom-[-50px] sm:right-[-150px] sm:h-48 sm:w-48 md:bottom-[-60px] md:right-[-165px] md:h-48 md:w-48 lg:bottom-[-52px] lg:right-5 lg:h-52 lg:w-52"
              ></div>
              <img
                src={link_image}
                alt="NextGen-Empoderando a la siguiente generación"
                className="z-20 h-[350px] w-4/5 max-lg:h-[400px] max-lg:min-w-[600px] max-md:h-[300px] max-md:min-w-[550px] max-sm:h-[200px] max-sm:min-w-[300px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 flex flex-col place-content-center place-items-center gap-10">
        <p className="font-acumin text-5xl font-bold text-primary-dark-green">
          Talleristas
        </p>
        <div className="mb-10 w-3/4">
          <ConferenceContainer edicionData={edicionData} campo="talleres" />
        </div>
      </div>
      <div
        className={`my-5 flex flex-col place-content-center place-items-center gap-10`}
      >
        <p className="font-acumin text-5xl font-bold text-primary-dark-green">
          Cronograma
        </p>
        {edicionData &&
          edicionData.talleres.map((evento, index) => (
            <CardInfoEdition
              key={index}
              type="Talleres"
              evento={evento}
              year={2024}
              index={index}
            />
          ))}
      </div>
    </AnimatedSection>
  );
}

export default NextGen;
