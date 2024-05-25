import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip } from "@material-tailwind/react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
export function ProfileCard({ conferencista,home }) {
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
      <Card className={`w-96 h-[600px] ${state ? 'block' : 'hidden'} max-sm:w-80 ${home ? 'h-[600px] w-80':''}`}>
        <CardHeader floated={false} className={`min-h-96 w-full relative overflow-hidden ${home ? 'h-60':''}`} onClick={changeState}>
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
      <Card className={`w-96 h-[600px] overflow-scroll  scroll-smooth py-10 ${state ? 'hidden' : 'block'}`} onClick={changeState}>
        <p className="px-10 text-justify text-2xl">
          {conferencista.info}
        </p>
      </Card>
    </div>

  )
}
