import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip } from "@material-tailwind/react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiV } from "react-icons/si";
export function ProfileCard({ conferencista, home, onClickFunction, active, year }) {
  const path_conferencistas = `/assets/Eventos/Ediciones/${year}/Images/conferencistas/`
  let image = conferencista.name ? path_conferencistas + conferencista.imageName : conferencista.imageName;
  let boolean = conferencista.imageName == "/assets/Conferences/Logo.png";
  let value = false;
  if (active == null) {
    value = false;
  }
  else {
    value = conferencista.name == active.name;
  }
  return (
    ! boolean ?
      <div>
        <Card className={`w-96 h-[600px]  max-sm:w-80 ${home ? 'h-[600px] w-80' : ''} ${value ? 'opacity-40' : ''} hover:cursor-pointer`} onClick={() => onClickFunction(conferencista)} >
          <CardHeader floated={false} className={`min-h-96 w-full relative overflow-hidden ${home ? 'h-60' : ''}`}>
            <img src={image} alt="Conferencista" className="h-full w-full object-cover" />
          </CardHeader>
          <CardBody className="text-center h-32 text-primary-dark-green">
            <p className="text-primary-dark-green font-bold">{conferencista.name}</p>
            <p>{conferencista.work}, {conferencista.place}</p>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2 text-black">
            {conferencista.linkeding ?
              <Tooltip content="Follow on LinkedIn">
                <a href={conferencista.linkeding} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} />
                </a>
              </Tooltip> : <></>
            }
            {conferencista.x ?
              <Tooltip content="Follow on X">
                <a href={conferencista.x} target="_blank" rel="noopener noreferrer">
                  <FaXTwitter size={30} />
                </a>
              </Tooltip> : <></>
            }
          </CardFooter>
        </Card>
      </div> : 
        <Card className={`w-96 h-[580px] mt-5 max-sm:w-80 bg-neutral-grey bg-opacity-55 text-center place-content-center place-items-center` }>
            <p className="font-acumin font-bold text-9xl text-white">?</p>
        </Card> 
  )
}
