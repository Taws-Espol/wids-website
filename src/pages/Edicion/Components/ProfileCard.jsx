import React, { useRef } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
} from '@material-tailwind/react';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import useIntersectionObserver from './../../../shared/Hook_scroll';

export function ProfileCard({
  conferencista,
  home,
  onClickFunction,
  active,
  year,
  animationClass = 'animate-fadeInFromBottom',
}) {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

  const path_conferencistas = `/assets/Eventos/Ediciones/${year}/Images/conferencistas/`;
  let image = conferencista.name
    ? path_conferencistas + conferencista.imageName
    : conferencista.imageName;
  let boolean = conferencista.imageName === '/assets/Conferences/Logo.png';
  let value = false;
  if (active == null) {
    value = false;
  } else {
    value = conferencista.name === active.name;
  }

  return !boolean ? (
    <div
      ref={cardRef}
      className={`transition-opacity duration-1000 ${isVisible ? `${animationClass}` : 'opacity-0'}`}
    >
      <Card
        className={`h-[600px] w-96 max-sm:w-80 ${home ? 'h-[600px] w-80' : ''} ${value ? 'opacity-40' : ''} transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer hover:shadow-2xl`}
        onClick={() => onClickFunction(conferencista)}
      >
        <CardHeader
          floated={false}
          className={`relative ml-[-2px] h-[400px] w-full overflow-hidden ${home ? 'h-60' : ''}`}
        >
          <img
            src={image}
            alt="Conferencista"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="h-32 text-center text-primary-dark-green">
          <p className="text-2xl font-bold text-primary-dark-green">
            {conferencista.name}
          </p>
          <p>
            {conferencista.work}, {conferencista.place}
          </p>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2 text-black">
          {conferencista.linkeding && (
            <Tooltip content="Follow on LinkedIn">
              <a
                href={conferencista.linkeding}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={30} />
              </a>
            </Tooltip>
          )}
          {conferencista.x && (
            <Tooltip content="Follow on X">
              <a
                href={conferencista.x}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter size={30} />
              </a>
            </Tooltip>
          )}
        </CardFooter>
      </Card>
    </div>
  ) : (
    <Card
      className={`mt-5 h-[580px] w-96 place-content-center place-items-center bg-neutral-grey bg-opacity-55 text-center max-sm:w-80`}
    >
      <p className="font-acumin text-9xl font-bold text-white">?</p>
    </Card>
  );
}
