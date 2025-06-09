import { useRef } from 'react';
import redes from '../data/redes';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';
import { FaSquareFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
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
    <footer className="font-sans">
      <div
        className={`flex flex-col flex-wrap place-content-center place-items-center bg-opacity-20 sm:flex-row ${nothome ? 'hidden' : 'block'}`}
      >
        {/* Imagen para escritorio */}
        <img
          src="/assets/WidsLogoVertical.webp"
          className="hidden h-40 w-40 sm:block"
        />
        {/* Imagen para móviles */}
        <img
          src="/assets/navbar/Logo_wids2024SG.webp"
          className="block h-20 w-40 sm:hidden"
        />
        <div className="mx-8 hidden h-32 border-l-2 border-[rgb(0,65,43)] md:block"></div>
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="mb-1 text-lg font-semibold text-[rgb(0,65,43)]">
            Email
          </p>
          <a
            href="mailto:wids_taws@fiec.espol.edu.ec"
            className="md:text-1xl lg:text-1xl text-xl font-bold text-primary-dark-green hover:underline"
          >
            wids_taws@fiec.espol.edu.ec
          </a>
          <div className="mt-4 flex items-center space-x-6">
            {/* Facebook */}
            <a
              href={redes.fb}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark-green hover:text-green-700"
            >
              <FaSquareFacebook className="h-8 w-8" />{' '}
              {/* Tamaño con h-10 w-10 */}
            </a>
            {/* Instagram */}
            <a
              href={redes.ig}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark-green hover:text-green-700"
            >
              <FaInstagram className="h-8 w-8" /> {/* Mismo tamaño */}
            </a>
            {/* X / Twitter */}
            <a
              href={redes.tw}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark-green hover:text-green-700"
            >
              <FaXTwitter className="h-8 w-8" />{' '}
              {/* Mismo tamaño, se debería alinear */}
            </a>
          </div>
        </div>
      </div>
      <div className="mb-16 mt-2 flex h-2 w-full px-4 md:px-8 lg:px-16">
        <div className="flex-1 bg-primary-acc-blue"></div>
        <div className="flex-1 bg-primary-acc-green"></div>
        <div className="flex-1 bg-primary-acc-yellow"></div>
      </div>
    </footer>
  );
}

export default Footer;
