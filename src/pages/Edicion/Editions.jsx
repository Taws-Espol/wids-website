import { ediciones } from "../../data/ediciones";
import EventCard from "../Home/Components/EventCard";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import EditionCard from "./Components/EditionCard";

function Editions() {
	return (
		<>
			<section className='bg-gray-2 pt-20 pb-20'>
				<div className="flex flex-col w-full place-content-center place-items-center">
					<div className="flex w-4/5 place-content-start place-items-center pb-40">
						<h1 className="text-4xl text-primary-dark-green">Ediciones anteriores</h1>
					</div>
					<div className='flex w-4/5 flex-wrap place-content-start place-items-center gap-16 '>
							<Link to='/ediciones/2020'>
								<EditionCard
									key='1'
									color='bg-green-edition'
									year='2020'
								/>
							</Link>
							<Link to='/ediciones/2021'>
								<EditionCard
									key='2'
									color='bg-red-edition'
									year='2021'
								/>
							</Link>
							<Link to='/ediciones/2022'>
								<EditionCard
									key='3'
									color='bg-blue-edition'
									year='2022'
								/>
							</Link>
							<Link to='/ediciones/2023'>
								<EditionCard
									key='4'
									color='bg-yellow-edition'
									year='2023'
								/>
							</Link>
						</div>
				</div>
			</section>
		</>
	);
}

export default Editions;
