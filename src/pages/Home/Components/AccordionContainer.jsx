import React from "react";
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill=''
			viewBox='0 0 24 24'
			strokeWidth={2}
			stroke='currentColor'
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
		<>
			<Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
				<AccordionHeader
					onClick={() => handleOpen(1)}
					className={`border-b-0 transition-colors ${
						open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
					}`}
				>
					Cronograma
				</AccordionHeader>
				<AccordionBody>
					{edicionData &&
						edicionData.cronograma.map((evento, index) => (
							<div key={index}>
								<h3>{evento.nombre}</h3>
								<p>{evento.descripcion}</p>
							</div>
						))}
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
				<AccordionHeader
					onClick={() => handleOpen(2)}
					className={`border-b-0 transition-colors ${
						open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
					}`}
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
					className={`border-b-0 transition-colors ${
						open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
					}`}
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
		</>
	);
}
