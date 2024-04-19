import PropTypes from 'prop-types';
import './Info.css';
import CountUp from 'react-countup';

//number y text son provisionales
function Contador(props) {
    return (
        <div className='flex items-center'>
            <div className="grid items-center rounded-[1vw] pl-[2vw] pr-[2vw] min-w-[9vw] rounded-r-none h-[100%] number-box"> 
                <CountUp className='font-semibold pt-[1vw] text-[8vw] sm:text-[6vw] md:text-[3.6vw]' end={props.number} separator=" "/>
                <p className='pb-[2vw] text-[2.7vw] sm:text-[2vw] md:text-[1.1vw]'>{props.text}</p>
            </div>
        </div>
    )
}
Contador.propTypes = {
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
};

export default Contador
