import React from 'react';

function EventBanner() {
    return (
        <div className="flex justify-between items-center bg-yellow-400 p-5 rounded-lg">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-3">Datathon</h1>
                <p className="text-xl text-gray-800">Diagnóstico de Cáncer Metastático en 90 días</p>
                <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-300">
                    Regístrate Aquí
                </button>
            </div>
            <img src="/path/to/image.jpg" alt="Cáncer Metastático" className="w-1/2 rounded-lg shadow-lg" />
        </div>
    );
}

export default EventBanner;
