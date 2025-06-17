import React from 'react';

export default function Subtitle({ title, bgColor }) {
  return (
    <div
      className="w-full rounded-lg px-6 py-3 text-center font-bold text-white"
      style={{ backgroundColor: bgColor }}
    >
      <p className="text-[40px]">{title}</p>
    </div>
  );
}
