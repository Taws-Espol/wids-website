import React from 'react';

const Ubicacion = () => {
    return (
        <div className="bg-black text-white">
            <div className="container mx-auto py-6 px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold" >Ubicación</h1>
                </div>
            </div>

            <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start px-4 md:px-20 pb-20 pt-8">
                <div className="md:w-1/2"> 
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1494.5011907822418!2d-79.96631895396388!3d-2.145020582613316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d72f925e5bfdb%3A0x327cdb9f7f4ba3b2!2sEscuela%20Superior%20Polit%C3%A9cnica%20del%20Litoral%20(ESPOL)!5e0!3m2!1ses-419!2sec!4v1712382387776!5m2!1ses-419!2sec" 
                        width="650"
                        height="900"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-45 h-96 max-w-full shadow-md rounded-lg" 
                    ></iframe>
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0 md:ml-8">
                    <div className=' px-8 pt-12'> 
                        <h2 className="mt-4  text-4xl">Edificio STEM</h2>
                        <h2 className="mt-10 text-2xl">Campus Gustavo Galindo</h2>
                        <h2 className="mt-2 text-2xl">Km. 30 vía Perimetral</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ubicacion;