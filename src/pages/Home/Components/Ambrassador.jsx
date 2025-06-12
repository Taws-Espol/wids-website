import CardAmbrassador from './CardAmbrassador';

const Ambassador = () => {
  return (
    <div className="relative bg-cyan-200 p-8 text-center shadow-lg">
      <svg
        width="150"
        height="150"
        className="absolute -top-16 right-40 hidden sm:block"
      >
        <circle cx="75" cy="75" r="70" fill="#0891B2" />
        <text
          x="75"
          y="75"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="16"
          fontWeight="600"
        >
          Team WiDS
        </text>
      </svg>
      <h2 className="mb-6 pl-10 pr-10 text-left text-2xl font-semibold text-gray-700 sm:pl-40 sm:pr-20">
        Estas son las voces que representan a WiDS como embajadora y
        coembajadoras.
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        <CardAmbrassador
          name="Daniela Roldón Carranza"
          role="Coembajadora"
          image="https://www.w3schools.com/w3images/avatar2.png"
        />
        <CardAmbrassador
          name="Daniela Roldón Carranza"
          role="Coembajadora"
          image="https://www.w3schools.com/w3images/avatar2.png"
        />
        <CardAmbrassador
          name="Daniela Roldón Carranza"
          role="Coembajadora"
          image="https://www.w3schools.com/w3images/avatar2.png"
        />
        <CardAmbrassador
          name="Daniela Roldón Carranza"
          role="Coembajadora"
          image="https://www.w3schools.com/w3images/avatar2.png"
        />
      </div>
    </div>
  );
};

export default Ambassador;
