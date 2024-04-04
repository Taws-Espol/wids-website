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
      <footer className='font-acumin' onSubmit={handleSubmit}>
        <ul className="bg-[rgb(0,0,0)] grid xl:grid-cols-2 grid-cols-1 w-full px-4 py-4">
          <li className="px-20 pt-10 xl:text-start text-center">
            <h2 className="text-[35px] font-semibold text-white mb-10">Contacto</h2>
          </li>
          <li className="px-20 text-center">
            <br className='xl:block hidden'/>
            <br className='xl:block hidden'/>
            <br className='xl:block hidden'/>
            <br className='xl:block hidden'/>
            <form className='' onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2">
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
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2">
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
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2">
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
              <div className="mb-10">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2">
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
              <div className="mb-10 xl:text-end">
                <input type="submit" id="submit" name="submit" value="Enviar" className="cursor-pointer border-1 bg-white px-3 py-2 rounded-md"/>
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
  