import { useRef } from 'react';
import redes from '../data/redes';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';
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
      .sendForm('service_6ygspus', 'template_isxctpo', form.current, {
        publicKey: '_cQ9l5FCItinKLnlc',
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
  const nothome = location.pathname.split('/').pop();

  return (
    <footer className="font-acumin">
      <div
        className={`flex flex-wrap place-content-center place-items-center bg-neutral-grey bg-opacity-20 ${nothome ? 'hidden' : 'block'}`}
      >
        <img src="/assets/WidsLogoVertical.webp" className="h-96 w-96" />
        <div className="flex flex-col max-lg:place-content-center max-lg:place-items-center">
          <h2 className="mb-3 font-acumin text-7xl font-bold text-primary-dark-green max-sm:text-5xl">
            Contacto
          </h2>
          <h3 className="mb-12 !select-text font-acumin text-5xl text-primary-dark-green max-sm:text-3xl">
            wids_taws@fiec.espol.edu.ec
          </h3>
        </div>
      </div>
      <ul className="bottom-0 flex w-full justify-center bg-[rgb(0,65,43)] pb-6 pt-4">
        <li className="pl-5 pr-5">
          <a href={redes.fb} target="_blank">
            <img
              src="/assets/footer/icons8-facebook.svg"
              className="h-6 w-6 xl:h-10 xl:w-10"
            />
          </a>
        </li>
        <li className="pl-5 pr-5">
          <a href={redes.ig} target="_blank">
            <img
              src="/assets/footer/icons8-instagram.svg"
              className="h-6 w-6 xl:h-10 xl:w-10"
            />
          </a>
        </li>
        <li className="pl-5 pr-5">
          <a href={redes.tw} target="_blank">
            <img
              src="/assets/footer/icons8-twitterx.svg"
              className="h-6 w-6 xl:h-10 xl:w-10"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
