import PropTypes from 'prop-types';
import './Info.css'
//number y text son provisionales
function Contador(props) {
    return (
        <div className="p-2 flex-col justify-evenly number-box">
            <p style={{fontSize: '2.8em', fontWeight:'600'}}>{props.number}</p>
            <p>{props.text}</p>
        </div>
    )
}
Contador.propTypes = {
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
};

export default Contador
