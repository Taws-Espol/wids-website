import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import './Cards.css';
import PropTypes from 'prop-types';

export function Cards(props) {
  return (
    <Card className="w-[35vw] md:w-[22vw]">
      <div className="image_wrapper">
        <CardHeader floated={false} className="h-fit">
          <img src={props.image} alt="profile-picture" className="w-full" />
        </CardHeader>
        <div className="overlay rounded-xl">
          <div className="flex justify-center p-[2vw]">
            <p className="text-[2.8vw] font-medium md:text-[1.6vw]">
              {props.info}
            </p>
          </div>
        </div>
      </div>
      <CardBody className="p-[0.8vw] text-center lg:p-[1.2vw] 2xl:p-[2.1vw]">
        <Typography
          variant="h4"
          color="blue-gray"
          className="max-md:text-[2.8vw] sm:mb-2 md:text-[1.7vw] lg:text-[1.8vw]"
        >
          {props.name}
        </Typography>
      </CardBody>
    </Card>
  );
}

Cards.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
export default Cards;
