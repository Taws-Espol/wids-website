import PropTypes from 'prop-types';
import './Info.css';
import CountUp from 'react-countup';

//number y text son provisionales
function Contador(props) {
    return (
        <div className="flex-col justify-evenly number-box">
            <CountUp className='numbers' end={props.number} separator=" "/>
            <p>{props.text}</p>
        </div>
    )
}
Contador.propTypes = {
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
};

export default Contador
