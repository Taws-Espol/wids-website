import React from 'react';

const AmbassadorCard = ({ name, title, imageSrc }) => {
  return (
    <div className="max-w-xs overflow-hidden bg-white shadow-lg">
      <img className="h-56 w-full object-cover" src={imageSrc} alt={name} />
      <div className="p-4">
        <h3 className="text-center text-xl font-semibold text-green-700">
          {name}
        </h3>
        <p className="text-center text-sm text-green-600">{title}</p>
      </div>
    </div>
  );
};

export default AmbassadorCard;
