import { useState } from 'react';
import  redes  from '../data/redes';
function Footer() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
      <footer>
        <ul className="bg-[rgb(0,0,0)] xl:grid grid-flow-col justify-stretch w-full px-4 py-4">
          <li className="xl:px-10 xl:py-5 xl:text-start text-center">
            <h2 className="text-2xl font-semibold text-white">Contacto</h2>
          </li>
          <li className="xl:px-30 px-10 text-center">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border-b-2 border-white w-full text-white focus:outline-none py-1"
                  placeholder="Nombre"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border-b-2 border-white w-full text-white focus:outline-none py-1"
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-transparent border-b-2 border-white w-full text-white focus:outline-none py-1"
                  placeholder="Asunto del mensaje"
                />
              </div>
              <div className="mb-00">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-transparent border-2 border-white w-full text-white focus:outline-none py-1 px-2"
                  placeholder="mensaje"
                ></textarea>
              </div>
            </form>
          </li>
        </ul>
        <ul className="flex w-full bottom-0 justify-center bg-[rgb(0,65,43)] pt-4 pb-6">
          <li className="pl-5 pr-5">
            <a href={redes.fb} target='_blank'>
              <img
                src="/src/assets/footer/icons8-facebook.svg"
                className="xl:w-10 xl:h-10 w-6 h-6"
              />
            </a>
          </li>
          <li className="pl-5 pr-5">
            <a href={redes.ig} target='_blank'>
              <img
                src="/src/assets/footer/icons8-instagram.svg"
                className="xl:w-10 xl:h-10 w-6 h-6"
              />
            </a>
          </li>
          <li className="pl-5 pr-5">
            <a href={redes.tw} target='_blank'>
              <img
                src="/src/assets/footer/icons8-twitterx.svg"
                className="xl:w-10 xl:h-10 w-6 h-6"
              />
            </a>
          </li>
        </ul>
      </footer>
    );
  }
  
  export default Footer;
  