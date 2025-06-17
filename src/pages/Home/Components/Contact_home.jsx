import React from 'react';

export default function Contact_home() {
  return (
    <section className="flex w-full flex-col items-start justify-between gap-8 bg-yellow-400 px-8 py-12 md:flex-row">
      {/* Texto de la izquierda */}
      <div className="w-full md:w-1/3">
        <h2 className="mb-2 text-3xl font-bold text-green-900">Contacto</h2>
        <p className="text-lg text-green-900">
          ¿Tienes dudas o sugerencias?
          <br /> Escríbenos.
        </p>
      </div>

      {/* Formulario */}
      <form className="w-full space-y-4 md:w-2/3">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Nombre completo*"
            className="w-full rounded-full border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-700 md:w-1/2"
          />
          <input
            type="email"
            placeholder="Correo electrónico*"
            className="w-full rounded-full border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-700 md:w-1/2"
          />
        </div>
        <textarea
          placeholder="Mensaje"
          rows="4"
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-700"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-green-900 px-8 py-2 font-semibold text-white transition duration-200 hover:bg-green-800"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
