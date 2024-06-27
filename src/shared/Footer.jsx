import { useRef } from 'react';
import redes from '../data/redes';
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
      <div className={`bg-neutral-grey bg-opacity-20 flex-wrap flex place-content-center place-items-center ${nothome ? 'hidden' : 'block'}`}>
        <img src="/assets/WidsLogoVertical.webp" className="h-96 w-96" />
        <div className='flex flex-col'>
          <h2 className="text-7xl font-acumin font-bold text-primary-dark-green mb-3 max-sm:text-5xl">Contacto</h2>
          <h3 className="text-5xl font-acumin text-primary-dark-green mb-12 !select-text max-sm:text-3xl">wids@fiec.espol.edu.ec</h3>
        </div>
      </div>
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

