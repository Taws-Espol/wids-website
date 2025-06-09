import { Sponsors_Cola } from '../../../data/sponsors';
import Sponsor from './Sponsor';
import Club from './Club';
import Subtitle from './Subtitle';
import AnimatedSection from './../../../shared/AnimatedSection';
export default function Sponsors() {
  const google = Sponsors_Cola.importants[0];

  return (
    <div
      className={`mb-20 mt-16 flex select-none flex-col place-content-center place-items-center items-center font-acumin text-primary-dark-green`}
    >
      <AnimatedSection>
        <div className="mb-20 flex flex-col place-content-center place-items-center gap-10">
          <p className="text-4xl font-bold">ORGANIZADOR</p>
          <a href={'https://www.instagram.com/taws_espol'} className="">
            <img
              src="/assets/taws.webp"
              alt="Taws"
              width={230}
              className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            />
          </a>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="mb-20 flex flex-col place-content-center place-items-center">
          <p className="text-4xl font-bold">SPONSORS</p>
          <div className="mt-10 flex place-content-center place-items-center gap-10 max-sm:flex-col sm:flex-wrap">
            <a
              href={google.website}
              className="flex h-full w-full items-center justify-center text-pink-500"
            >
              <img
                src={google.logo}
                alt={google.name}
                className="h-2/5 w-3/5 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              />
            </a>
          </div>
          <div className="mt-10 flex place-content-center place-items-center gap-10 max-sm:flex-col sm:flex-wrap">
            {Sponsors_Cola.sponsors.map((sponsor, index) => (
              <Sponsor key={index} {...sponsor} />
            ))}
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="flex flex-col place-content-center place-items-center">
          <p className="text-4xl font-bold">CLUBES ASOCIADOS</p>
          <div className="mt-10 flex place-content-center place-items-center gap-10 max-sm:flex-col sm:flex-wrap">
            {Sponsors_Cola.colaboradores.map((sponsor, index) => (
              <Club key={index} {...sponsor} />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
