function Nosotros() {
    return (
        <>
            <section className='bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
                <div className='container flex flex-col lg:flex-row items-center lg:items-start'>
                    <div className='lg:mr-8'style={{marginRight:'2cm',marginLeft:'3cm',position:'relative',top:'0',left:'0', marginBottom: '1cm'}}>
                        <img
                            src='/src/assets/wids-logo.png'
                            alt='Imagen de evento'
                            className='w-full max-w-[300px] h-auto'
                            style={{width:'90%',maxWidth:'700px',height:'90%',maxHeight:'289.29px'}}
                        />
                    </div>
                    <div className='text-xl font-inrian-sans text-black mt-4 lg:mt-0'style={{ textAlign: 'justify', width: '90%', maxWidth: '563px', height: '90%',maxHeight:'338px', position: 'relative', top: '-0.5cm' }}>
                        {/* Texto de Lorem Ipsum */}
                        WiDS Guayaquil@ESPOL es un evento independiente organizado por la PhD. Carmen Vaca con sede en la Escuela Superior Politécnica del Litoral (ESPOL), que coincide con la conferencia anual global de Women in Data Science (WiDS) realizada por la Universidad de Stanford y aproximadamente más de 150 localidades en todo el mundo. Todas las personas están invitadas a asistir a los eventos regionales de WiDS, que presentan mujeres destacadas que realizan un trabajo excepcional.
                    </div>
                </div>
            </section>
        </>
    );
  }
  
  export default Nosotros;
  