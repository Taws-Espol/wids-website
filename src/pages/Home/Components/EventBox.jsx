import image from '../../../assets/calendar.png';

export default function EventBox({ name, description }) {
    return (
        <div className='w-full flex flex-row p-6 border-2 border-primary-acc-violet space-x-8'>
            <div>
                <img src={image} alt="calendar" className='max-h-12 max-w-12'/>
            </div>
            <div>
                <h4 className='text-primary-dark-green text-lg'>{name}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}
