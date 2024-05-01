import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from 'prop-types'
 
export function ProfileCard({name, image}) {
  return (
    <Card className="w-[20rem]">
      <CardHeader floated={false} className="h-[18rem]">
        <img src={image} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
			{name};
        </Typography>
      </CardBody>
    </Card>
  );
}

ProfileCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}

export default ProfileCard
