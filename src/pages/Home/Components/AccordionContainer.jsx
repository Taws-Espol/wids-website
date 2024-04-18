import React from "react";
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react";
import EventBox from "./EventBox";

function Icon({ id, open }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='white'
			viewBox='0 0 24 24'
			strokeWidth={2}
			stroke='white'
			className={`${
				id === open ? "rotate-180" : ""
			} h-5 w-5 transition-transform`}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M19.5 8.25l-7.5 7.5-7.5-7.5'
			/>
		</svg>
	);
}

export default function AccordionContainer({ edicionData }) {
	const [open, setOpen] = React.useState(0);

	const handleOpen = (value) => setOpen(open === value ? 0 : value);

	return (
		<div className="flex flex-col space-y-4 px-10p mt-10">
			<Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
				<AccordionHeader
					onClick={() => handleOpen(1)}
					className={`border-b-0 rounded p-4 bg-primary-acc-violet text-white transition-colors`}
				>
					Cronograma
				</AccordionHeader>
				<AccordionBody>
					<div className="flex flex-col items-center space-y-4 px-7p py-4">
						{edicionData &&
							edicionData.cronograma.map((evento, index) => (
								<EventBox key={index} name={evento.nombre} description={evento.descripcion} />
							))}
					</div>
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
				<AccordionHeader
					onClick={() => handleOpen(2)}
					className={`border-b-0 rounded p-4 bg-primary-acc-violet text-white transition-colors`}
				>
					Conferencistas
				</AccordionHeader>
				<AccordionBody>
					{edicionData &&
						edicionData.conferencistas.map((conferencista, index) => (
							<div key={index}>
								{/* TODO: AGREGAR LA FOTO DE LA CONFERENCISTA, SUGIERO USAR UNA CARD :D*/}
								<h3>{conferencista.nombre}</h3>
							</div>
						))}
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
				<AccordionHeader
					onClick={() => handleOpen(3)}
					className={`border-b-0 rounded p-4 bg-primary-acc-violet text-white transition-colors`}
				>
					Talleres
				</AccordionHeader>
				<AccordionBody>
					{edicionData &&
						edicionData.talleres.map((taller, index) => (
							<div key={index}>
								<h3>{taller.nombre}</h3>
								<h3>{taller.descripcion}</h3>
							</div>
						))}
				</AccordionBody>
			</Accordion>
		</div>
	);
}
