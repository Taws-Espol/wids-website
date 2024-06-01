import { sponsors } from "../../../data/sponsors";
import Sponsor from "./Sponsor";
import Subtitle from "./Subtitle";

export default function Sponsors() {
	return (
		<div className='flex flex-col items-center p-20 '>
			<Subtitle text='Organizador' />
			<div className='my-20'>
				<img src='/assets/taws.png' alt='Taws' width={200} />
			</div>
			<Subtitle text='Sponsors' />
			<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-y-12 gap-x-10'>
				{sponsors.map((sponsor, index) => (
					<Sponsor key={index} {...sponsor} />
				))}
			</div>
		</div>
	);
}
