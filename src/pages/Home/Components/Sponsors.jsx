import { sponsors } from "../../../data/sponsors";
import Sponsor from "./Sponsor";
import Subtitle from "./Subtitle";
import AnimatedSection from "./../../../shared/AnimatedSection";
export default function Sponsors() {
	return (
		<div className={`flex flex-col items-center p-20 select-none mt-32`}>
			<AnimatedSection>
				<Subtitle text='ORGANIZADOR' />
			</AnimatedSection>
			<AnimatedSection>
				<div className='my-20'>
					<img src='/assets/taws.png' alt='Taws' width={200} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"/>
				</div>
			</AnimatedSection>
			<AnimatedSection>
				<Subtitle text='SPONSORS' />
			</AnimatedSection>
			<AnimatedSection>
				<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-y-12 gap-x-10'>
					{sponsors.map((sponsor, index) => (
						<Sponsor key={index} {...sponsor} />
					))}
				</div>
			</AnimatedSection>
		</div>
	);
}
