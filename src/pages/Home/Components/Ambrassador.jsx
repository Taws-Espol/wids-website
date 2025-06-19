import CardAmbrassador from './CardAmbrassador';
import ambassadors from '../../../data/Ambrassador';

const Ambassador = () => {
  return (
    <div className="relative bg-cyan-200 p-8 text-center shadow-lg">
      <svg
        width="200"
        height="200"
        className="absolute -right-3 -top-16 hidden sm:block md:right-10 lg:right-28"
      >
        <circle cx="100" cy="100" r="80" fill="#0891B2" />
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="23"
          fontWeight="600"
        >
          Team WiDS
        </text>
      </svg>
      <h2 className="mx-auto mb-10 ml-4 max-w-xl px-6 text-left text-2xl font-semibold text-gray-700 sm:px-0 md:ml-6 lg:ml-[50px]">
        Estas son las voces que representan a WiDS como embajadora y
        coembajadoras.
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {ambassadors.map((ambassador, index) => (
          <CardAmbrassador
            key={index}
            name={ambassador.name}
            imageSrc={ambassador.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Ambassador;
