function Nosotros() {
    return (
        <>
            <section className='bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
                <div className='container flex w-[100%] place-content-center place-items-center max-lg:flex-col'>
                    <div className='w-[50%] flex place-content-center place-items-center '>
                        <img
                            src='/src/assets/navbar/Logo_wids2024.jpg'
                            alt='Imagen de evento'
                            className='w-[70%] max-h-50'
                        />
                    </div>
                    <div className='w-[50%]'>
                        <p className='text-xl text-justify'>
                            {/* Texto de Lorem Ipsum */}
                            WiDS Guayaquil@ESPOL es un evento independiente organizado por la PhD. Carmen Vaca con sede en la Escuela Superior Politécnica del Litoral (ESPOL), que coincide con la conferencia anual global de Women in Data Science (WiDS) realizada por la Universidad de Stanford y aproximadamente más de 150 localidades en todo el mundo. Todas las personas están invitadas a asistir a los eventos regionales de WiDS, que presentan mujeres destacadas que realizan un trabajo excepcional.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Nosotros;
