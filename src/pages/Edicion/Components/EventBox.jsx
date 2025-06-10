import image from '../../../assets/calendar.png';

export default function EventBox({ name, description }) {
  return (
    <div className="flex w-full flex-row space-x-8 border-2 border-primary-acc-violet p-6">
      <div>
        <img src={image} alt="calendar" className="max-h-12 max-w-12" />
      </div>
      <div>
        <h4 className="text-lg text-primary-dark-green">{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
