import { MdLocationPin } from "react-icons/md";
const Ubicacion = () => {
    return (
        <div className="bg-neutral-grey bg-opacity-20 text-primary-dark-green flex flex-col md:flex-row items-center select-none !w-full">
            <div className="flex !w-3/4">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.026445702663!2d-79.96903302423073!3d-2.1435536371656436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d7302f96af647%3A0x5a1dd75c545cedd!2sSTEM%20(Edificio%20de%20Posgrados)!5e0!3m2!1ses-419!2sec!4v1718137962522!5m2!1ses-419!2sec"
                    width="800"
                    height="600"
                    style={{ border: '0' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="!w-full !h-[500px] shadow-md rounded-lg"
                ></iframe>
            </div>
            <div className="flex flex-col !w-1/4">
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
    );
}

export default Ubicacion;
