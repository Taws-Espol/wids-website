import { Sponsors_Cola } from '../../../data/sponsors';
import AnimatedSection from './../../../shared/AnimatedSection';
import SponsorsCarousel from './SponsorsCarousel';

export default function Sponsors() {
  const google = Sponsors_Cola.importants[0];
  const allSponsors = [
    ...Sponsors_Cola.importants,
    ...Sponsors_Cola.sponsors,
    ...Sponsors_Cola.colaboradores,
  ];

  return (
    <div className={`mb-20 mt-16 font-acumin text-primary-dark-green`}>
      {/*<AnimatedSection>
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
      </AnimatedSection>*/}
      <AnimatedSection>
        <div className="mb-20 flex flex-col place-content-center place-items-center">
          <p className="text-4xl font-bold">Sponsors y más</p>
        </div>
      </AnimatedSection>
      <SponsorsCarousel sponsors={allSponsors} />
    </div>
  );
}
