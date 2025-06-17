import Carrusel from './Components/Carrusel';
import { Infos } from './Components/Infos';
import Sponsors from './Components/Sponsors';
import Ubicacion from './Components/Ubicacion';
import AnimatedSection from './../../shared/AnimatedSection';
import Programa from './Components/Programa';
import AboutUsHome from './Components/about-us-home/AboutUsHome';
import Ambrassador from './Components/Ambrassador';
import Contact from './Components/Contact_home';
import AboutUsHome2 from './Components/AboutUs2';

function Inicio() {
  return (
    <div className="w-full overflow-x-hidden">
      <Carrusel />

      <AnimatedSection>
        <section className="select-none">
          <div>
            <h1
              className="mt-[20px] w-full pl-[0px] text-center font-acumin text-[2.5rem] font-thin xl:pl-[60px] xl:text-start"
              style={{ color: '#004029' }}
            ></h1>
          </div>

          <div className="mb-20 mt-[3vw]">
            <div className="mt-5 max-md:mb-[2vw] md:mb-[3em]">
              <h1
                className="w-full pl-0 text-center text-[6vw] font-normal md:text-[5vw] xl:pl-[60px] xl:text-start 2xl:text-[4vw] min-[2474px]:text-[3vw]"
                style={{ color: '#004029' }}
              >
                Las Cifras....
              </h1>
            </div>

            <AnimatedSection>
              <div className="w-full">
                <Infos />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/*<AnimatedSection>
        <Ubicacion />
      </AnimatedSection>*/}
      <AnimatedSection>
        <AboutUsHome2
          circleText="Sobre Nosotros"
          bgImage="/assets/images-carrusel/Events_Accordion_O.webp"
        />
      </AnimatedSection>
      <AboutUsHome />

      {/*<AnimatedSection>
        <div className="my-10 flex select-none flex-col place-content-center place-items-center font-acumin text-primary-dark-green">
          <h1 className="text-5xl font-bold">PROGRAMA</h1>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Programa />
          </div>
        </div>
      </AnimatedSection>*/}

      <AnimatedSection>
        <Ambrassador />
      </AnimatedSection>
      <AnimatedSection>
        <Sponsors />
      </AnimatedSection>

      <AnimatedSection>
        <Contact />
      </AnimatedSection>
    </div>
  );
}

export default Inicio;
