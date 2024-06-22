import { useRef } from 'react';
import  redes  from '../data/redes';
import emailjs from '@emailjs/browser';
import { useLocation } from "react-router-dom";
function Footer() {
    //https://www.emailjs.com/
    //codigo: https://www.emailjs.com/docs/examples/reactjs/
    //Cuenta google y Emialjs
    //pruebastaws@gmail.com
    //PruebasTaws1234
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_6ygspus", "template_isxctpo", form.current, {
        publicKey: "_cQ9l5FCItinKLnlc",
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
	const location = useLocation();
	const nothome = location.pathname.split("/").pop();

    return (
      <footer className='font-acumin'>
        <ul className={`bg-neutral-grey bg-opacity-20 grid xl:grid-cols-2 grid-cols-1 w-full px-4 py-4 ${nothome ? 'hidden':'block'}`}>
          <li className="px-20 pt-10 xl:text-start text-center">
            <h2 className="text-[35px] font-acumin font-semibold text-black mb-3">Contacto</h2>
            <h3 className="text-lg font-acumin text-gray-500 mb-12">wids@fiec.espol.edu.ec</h3> 
            <img src="/assets/wids-logo.webp" className="mx-auto"/>
          </li>
          <li className="px-20 text-center">
            <br className='xl:block hidden'/>
            <br className='xl:block hidden'/>
            <br className='xl:block hidden'/>
            <br className='xl:block hidden'/>
            
            <form className='' ref={form} onSubmit={sendEmail}>
              <div className="mb-6 max-sm:mt-10">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2">
                </label>
                <input
                  type="text"
                  name="user_name"
                  className="bg-transparent border-b-2 border-[rgb(0,167,213)] w-full font-acumin text-black focus:outline-none py-1"
                  placeholder="Nombre"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2">
                </label>
                <input
                  type="email"
                  name="user_email"
                  className="bg-transparent border-b-2 border-[rgb(74,185,105)] w-full font-acumin text-black focus:outline-none py-1"
                  placeholder="Correo Electrónico"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2">
                </label>
                <input
                  type="text"
                  name="Subject"
                  className="bg-transparent border-b-2 border-[rgb(255,203,5)] w-full font-acumin bg-opacity-5 text-black focus:outline-none py-1 "
                  placeholder="Asunto"
                />
              </div>
              <div className="mb-10">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2">
                </label>
                <textarea
                  name="message"
                  rows="4"
                  className="bg-transparent border-2 border-black w-full font-acumin text-black focus:outline-none py-1 px-2 rounded-md"
                  placeholder="Mensaje"
                ></textarea>
              </div>
              <div className="mb-10 flex justify-center">
                <input type="submit" value="Enviar" className="cursor-pointer  border-1 bg-[rgb(0,158,202)] font-acumin font-semibold text-xl text-white px-5 py-1 rounded-lg"/>
              </div>
            </form>
          </li>
        </ul>
        <ul className="flex w-full bottom-0 justify-center bg-[rgb(0,65,43)] pt-4 pb-6">
          <li className="pl-5 pr-5">
            <a href={redes.fb} target='_blank'>
              <img
                src="/assets/footer/icons8-facebook.svg"
                className="xl:w-10 xl:h-10 w-6 h-6"
              />
            </a>
          </li>
          <li className="pl-5 pr-5">
            <a href={redes.ig} target='_blank'>
              <img
                src="/assets/footer/icons8-instagram.svg"
                className="xl:w-10 xl:h-10 w-6 h-6"
              />
            </a>
          </li>
          <li className="pl-5 pr-5">
            <a href={redes.tw} target='_blank'>
              <img
                src="/assets/footer/icons8-twitterx.svg"
                className="xl:w-10 xl:h-10 w-6 h-6"
              />
            </a>
          </li>
        </ul>
      </footer>
    );
  }
  
  export default Footer;
  
