import React from 'react';
import { TERipple } from 'tw-elements-react';

const EventCard = ({ image, CardTitle }) => {
  return (
    <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <TERipple>
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img className="rounded-t-lg" src={image} alt="" />
        </div>

        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {CardTitle}
          </h5>
        </div>
      </TERipple>
    </div>
  );
};
export default EventCard;
