import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip } from "@material-tailwind/react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
export function ProfileCard({ conferencista }) {
  const path_conferencistas = "/src/assets/Eventos/Ediciones/2020/Images/conferencistas/"
  let image = path_conferencistas + conferencista.imageName;

  // true hidden
  // false block
  const [state, setState] = useState(true);
  const changeState = () => {
    setState(!state)
  }
  return (
    <div>
      <Card className={`w-96 h-[600px] ${state ? '' : 'border-4 border-primary-violet'}`}>
        <CardHeader floated={false} className="min-h-96 min-w-96 relative overflow-hidden" onClick={changeState}>
          <img src={image} alt="Conferencista" className="h-full w-full object-cover" />
        </CardHeader>
        <CardBody className="text-center h-32">
          <p className="text-primary-dark-green font-bold">{conferencista.name}</p>
          <p>{conferencista.work}, {conferencista.place}</p>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
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
      <Card className={`w-96 max-h-96 overflow-scroll py-10 ${state ? 'hidden' : 'block border-4 border-primary-violet'}`}>
        <p className="px-10 text-justify text-2xl">
          {conferencista.info}
        </p>
      </Card>
    </div>

  )
}
