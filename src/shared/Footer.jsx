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
        <img src="/assets/WidsLogoVertical.webp" className="h-48 w-48" />
        <div className="mx-8 hidden h-40 border-l-2 border-[rgb(0,65,43)] md:block"></div>
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="mb-1 text-lg font-semibold text-[rgb(0,65,43)]">
            Email
          </p>
          <a
            href="mailto:wids_taws@fiec.espol.edu.ec"
            className="text-xl font-bold text-primary-dark-green hover:underline md:text-2xl lg:text-2xl"
          >
            wids_taws@fiec.espol.edu.ec
          </a>
          <div className="mt-4 flex space-x-6">
            <a href={redes.fb} target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/footer/icons8-facebook.svg"
                alt="Facebook"
                className="h-10 w-10 text-blue-600 hover:text-blue-700 xl:h-12 xl:w-12"
              />
            </a>
            <a href={redes.ig} target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/footer/icons8-instagram.svg"
                alt="Instagram"
                className="h-10 w-10 xl:h-12 xl:w-12"
              />
            </a>
            <a href={redes.tw} target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/footer/icons8-twitterx.svg"
                alt="X (anteriormente Twitter)"
                className="h-8 w-8 xl:h-10 xl:w-10"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="mb-16 mt-8 flex h-2 w-full px-4 md:px-8 lg:px-16">
        <div className="flex-1 bg-primary-yellow"></div>
        <div className="flex-1 bg-primary-acc-green"></div>
        <div className="flex-1 bg-primary-acc-blue"></div>
      </div>
    </footer>
  );
}

export default Footer;
