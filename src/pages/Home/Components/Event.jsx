import React from "react";
import {
	FaUserAlt,
	FaMixcloud,
	FaUtensils,
	FaMusic,
	FaFilm,
} from "react-icons/fa";

const iconMapping = {
	"Don Meetings": <FaUserAlt className='text-2xl' />,
	"Commuter x intl Mixer": <FaMixcloud className='text-2xl' />,
	"Student Leader Dinner": <FaUtensils className='text-2xl' />,
	"Y2K Backfield Party": <FaMusic className='text-2xl' />,
	"Quad Movie": <FaFilm className='text-2xl' />,
};

const Event = ({ time, title, color, isLast }) => {
	const Icon = iconMapping[title] || <FaUserAlt className='text-2xl' />;

	return (
		<div className='flex items-center justify-center mb-8'>
			<div className='relative'>
				{!isLast && (
					<div className='w-0.5 bg-gray-300 h-16 absolute left-1/2 transform -translate-x-1/2' />
				)}
				<div
					className={`z-10 rounded-full h-12 w-12 flex items-center justify-center ${color} text-white`}
				>
					{Icon}
				</div>
			</div>
			<div className='flex flex-col ml-4 text-left'>
				<span className='text-sm text-gray-600'>{time}</span>
				<span className='font-bold'>{title}</span>
			</div>
		</div>
	);
};

export default Event;
