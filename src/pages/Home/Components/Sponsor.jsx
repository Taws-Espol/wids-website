export default function Sponsor(data) {
  return (
    <div className="grid grid-cols-2 font-bold">
      <div className="m-auto">
        <img src={data.logo} alt={data.name} className="w-30 h-auto" />
      </div>
      <div className="ml-4 border-l-2 border-gray-400 pl-4 flex flex-col">
        <div className="my-auto">
        <p>{data.name}</p>
        <div className="flex flex-row items-center">
          <img src="src/assets/location.png" alt="Ubicación" className="h-5 w-auto"/>
          <p>{data.location}</p>
        </div>
        {data.website ? <a href={data.website} className="text-pink-500">Ir al sitio web</a> : null}

        </div>
      </div>
    </div>
  );
}
