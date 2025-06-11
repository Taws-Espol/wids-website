import AnimatedSection from '../../../../shared/AnimatedSection';

export default function Hero({ title, link }) {
  return (
    <AnimatedSection>
      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-yellow-500 pb-10 text-primary-dark-green md:flex-row md:items-start md:justify-start">
        <div className="flex w-4/5 flex-col items-center justify-center py-10 md:w-1/2 md:justify-start md:p-16">
          <h2 className="pb-10 text-center text-4xl font-bold md:text-start lg:text-5xl xl:text-6xl 2xl:text-[80px]">
            {title}
          </h2>
        </div>

        <div className="flex justify-center">
          <img
            src="/assets/Eventos/Datathon/data_portada.webp"
            alt="Event logo"
            className="h-auto max-h-[80%] w-full max-w-[80%] rounded-full py-2 shadow-xl sm:max-h-[70%] sm:max-w-[70%] md:absolute md:right-[-55%] md:top-0 md:max-h-full md:max-w-full md:object-cover md:shadow-2xl"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
