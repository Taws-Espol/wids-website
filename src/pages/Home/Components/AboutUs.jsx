import { aboutUsSection } from '../../../data/about-us.js';
function AboutUs() {
  return (
    <div className="min-h-screen w-full">
      <div className="relative mx-auto">
        <div className="absolute -top-12 left-24 flex h-40 w-40 items-center justify-center rounded-full bg-green-600 shadow-lg">
          <h1 className="m-auto p-2 text-center text-2xl">
            {aboutUsSection.header}
          </h1>
        </div>
        <img
          className="h-auto min-h-52 w-full"
          src="./../../../../public/assets/home/about-us/conferencia-auditorio-fiec.jpg"
        />
      </div>
      <div className="mb-20 mt-8 grid w-full grid-cols-1 place-items-center gap-6 p-8 md:grid-cols-2">
        <div className="p-4">
          <h2 className="mb-4 text-3xl font-light text-gray-800">
            {aboutUsSection.title}
          </h2>
          <p className="mb-4 text-gray-600">{aboutUsSection.text}</p>
        </div>
        <div className="relative h-full w-4/5 bg-gray-400">
          <div className="absolute left-1/2 z-20 h-40 w-40 -translate-x-1/2 transform rounded-full bg-orange-500"></div>
          <div className="absolute right-0 z-10 h-1/2 w-1/2 bg-yellow-500"></div>
          <div className="absolute bottom-0 right-1/2 z-30 h-1/2 w-24 bg-emerald-300"></div>
          <div className="absolute left-0 z-40 h-1/2 w-24 bg-green-800"></div>
          <img
            className="absolute bottom-0 right-0 z-10 h-1/2 w-1/2"
            src="./../../../../public/assets/home/about-us/conferencistas1.jpg"
          />
          <img
            className="absolute left-0 top-1/2 z-40 h-3/4 w-auto"
            src="./../../../../public/assets/home/about-us/conferencistas2.jpg"
          />
          <img
            className="absolute bottom-1/2 right-1/2 z-40 h-3/5 w-auto"
            src="./../../../../public/assets/home/about-us/personas-escuchando.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
