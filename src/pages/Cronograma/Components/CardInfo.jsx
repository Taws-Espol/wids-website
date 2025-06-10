export function CardInfo({ type, title, info }) {
  let image;
  switch (type) {
    case 'Conferencia':
      image = '/assets/images-cardInfo/Conferencia.webp';
      break;
    case 'Taller':
      image = '/assets/images-cardInfo/Taller.webp';
      break;
    case 'Break':
      image = '/assets/images-cardInfo/Break.webp';
      break;
    default:
      image = '/assets/images-cardInfo/Evento.webp';
  }

  return (
    <div className="font-acumin flex w-[482px] place-content-start gap-5 rounded-md border border-indigo-600 p-8 max-sm:w-[375px] max-xsm:w-[300px]">
      <img
        src={image}
        alt="Logo-Evento"
        className="h-8 w-8 max-sm:h-7 max-sm:w-7"
      />
      <div className="flex flex-col gap-2 text-justify">
        <p className="text-2xl text-primary-dark-green max-sm:text-xl max-xsm:text-lg">
          {title}
        </p>
        <p className="text-xl max-xsm:text-base">{info}</p>
      </div>
    </div>
  );
}
