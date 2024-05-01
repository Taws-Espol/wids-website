import PropTypes from 'prop-types'
import './Cards.css'

function Cards(props) {
  return (
        <div className='cards w-[35vw] md:w-[22vw] gap-[1vw]'>
            <div className='image_wrapper w-full h-fit rounded-[0.8em] sm:rounded-[1em] 2xl:rounded-[2em] border-[2px] 2xl:border-[0.2vw] overflow-hidden'>
                <img className='w-full' alt='Imagen' src='src/assets/info-de-conferencia/Carrusel/prueba6.jpeg'/>
                <div className='overlay'>
                    <div className='flex justify-center pr-[1.5vw] p-[2vw]'>
                        <p className='text-[2.8vw] md:text-[1.8vw] font-medium'>{props.info}</p>
                    </div>
                </div>
            </div>
            <div className='h-[3vw] text-center'>
                <p className='font-semibold text-[4vw] md:text-[2vw]'>{props.name}</p>
            </div>
        </div>
  )
}
Cards.propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired
}
export default Cards
