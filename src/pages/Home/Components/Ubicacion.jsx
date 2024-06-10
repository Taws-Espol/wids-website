import { MdLocationPin } from "react-icons/md";
const Ubicacion = () => {
    return (
        <div className="bg-neutral-grey bg-opacity-20 text-primary-dark-green">
            <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start select-none">
                <div className="md:w-3/4"> 
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2838.8613988715374!2d-79.96698388561424!3d-2.1444448966464003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d7302f96af647%3A0x5a1dd75c545cedd!2sSTEM%20(Edificio%20de%20Posgrados)!5e0!3m2!1ses!2sus!4v1717993368403!5m2!1ses!2sus" 
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full !h-[500px] max-w-full shadow-md rounded-lg" 
                    ></iframe>
                </div>
                <div className="md:w-1/4 mt-4 md:mt-0 md:ml-8">
                    <div className='flex flex-col place-content-start  font-acumin px-8 pt-12 '> 
                        <h1 className="text-6xl font-acumin font-bold" >UBICACIÓN</h1>
                        <div className='flex place-items-center  text-center gap-5'>
                            <MdLocationPin className='w-10 h-16 mt-4 ' />
                            <h2 className="mt-4  text-3xl">Edificio STEM</h2>
                        </div>
                        <h2 className="mt-10 text-2xl ml-3">Campus Gustavo Galindo</h2>
                        <h2 className="mt-2 text-2xl  ml-3">Km. 30 vía Perimetral</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ubicacion;
