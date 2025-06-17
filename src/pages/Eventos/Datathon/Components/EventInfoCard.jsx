import React from 'react';

export default function EventInfoCard({ duration, prize }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg">
      {/* Duración */}
      <div className="text-center">
        <p className="text-3xl font-semibold text-green-500">{duration}</p>
        <p className="text-sm text-gray-500">Duración</p>
      </div>

      {/* Premio */}
      <div className="text-center">
        <p className="text-3xl font-semibold text-blue-500">{prize}</p>
        <p className="text-sm text-gray-500">1er lugar</p>
      </div>
    </div>
  );
}
