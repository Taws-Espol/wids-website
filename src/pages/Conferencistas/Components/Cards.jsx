import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from 'prop-types'
 
export function Cards(props) {
    return (
        <Card className="w-[35vw] md:w-[22vw]">
            <div className="image_wrapper">
            <CardHeader floated={false} className="h-fit">
                    <img src={props.image} alt="profile-picture" className="w-full"/>
            </CardHeader>
                <div className='overlay rounded-xl'>
                    <div className='flex justify-center p-[2vw]'>
                        <p className='text-[2.8vw] md:text-[1.6vw] font-medium'>{props.info}</p>
                    </div>
                </div>
            </div>
            <CardBody className="text-center p-[0.8vw]  lg:p-[1.2vw] 2xl:p-[2.1vw]">
                <Typography variant="h4" color="blue-gray" className="sm:mb-2 max-md:text-[2.8vw] md:text-[1.7vw] lg:text-[1.8vw]">
                    {props.name}
                </Typography>
            </CardBody>
        </Card>
    );
}

Cards.propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}
export default Cards
