import { ediciones } from "../../data/ediciones";
import EventCard from "../Home/Components/EventCard";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom

function Eventos() {
	return (
		<>
			<section className='bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
				<h1>Ediciones anteriores</h1>
				<div className='container '>
					<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
						<Link to='/ediciones/2020'>
							<EventCard
								image='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg'
								CardTitle='2020'
							/>
						</Link>
						<Link to='/ediciones/2021'>
							<EventCard
								image='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg'
								CardTitle='2021'
							/>
						</Link>
						<Link to='/ediciones/2022'>
							<EventCard
								image='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg'
								CardTitle='2022'
							/>
						</Link>
						<Link to='/ediciones/2023'>
							<EventCard
								image='https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg'
								CardTitle='2023'
							/>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}

export default Eventos;
