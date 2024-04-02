import React from 'react';
import Event from './Event';

const events = [
    { time: '8:00 p.m.', title: 'Don Meetings', color: 'bg-red-500' },
    { time: '6:00 p.m.', title: 'Commuter x intl Mixer', color: 'bg-blue-500' },
    { time: '8:30 p.m.', title: 'Student Leader Dinner', color: 'bg-green-500' },
    { time: '9:00 p.m.', title: 'Y2K Backfield Party', color: 'bg-yellow-500' },
    { time: '9:00 p.m.', title: 'Quad Movie', color: 'bg-purple-500' }
  ];
    
const Cronograma = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full pt-4">
      <h1 className="text-2xl font-bold text-center mb-8">Cronograma</h1>
      <div className="relative">
        {events.map((event, index) => (
          <Event
            key={index}
            time={event.time}
            title={event.title}
            color={event.color}
            isLast={index === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Cronograma;

