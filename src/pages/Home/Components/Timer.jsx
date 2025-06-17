import React, { useEffect, useState } from 'react';
import '../../../index.css'; // Ensure the path is correct

export function Timer({ Event_date }) {
  const [rest, setTime] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to update time
  function updateTime(Event_date) {
    const updateCountdown = () => {
      const actual = new Date();
      const difference = Event_date - actual;

      if (difference <= 0) {
        clearInterval(intervalId);
        setTime({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 7);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTime({ weeks, days, hours, minutes, seconds });
      }
    };
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }

  // Correcting the useEffect to ensure it handles the Event_date correctly
  useEffect(() => {
    if (Event_date) {
      updateTime(Event_date);
    }
  }, [Event_date]);

  function CardTimer({ time, timeInfo, isSec }) {
    return (
      <div
        className={`flex h-[8vw] w-[7vw] select-none flex-col place-content-center place-items-center rounded-lg font-acumin font-bold text-black sm:h-[8vw] sm:w-[8vw] md:h-[7vw] md:w-[7vw] md:rounded-lg xl:h-[6rem] xl:w-[5.5rem] min-[1536px]:h-28 min-[1536px]:w-24 ${
          !isSec ? 'bg-white' : 'bg-primary-dark-green text-white'
        }`}
      >
        <p className="text-[3rem] font-thin sm:text-[3rem] md:text-[3rem] xl:text-[5.2rem]">
          {time}
        </p>
        <p className="mt-[-20px] text-[1rem] sm:text-[1rem] md:mt-[-22px] md:text-[1rem] xl:mt-[-30px] xl:text-[1rem]">
          {timeInfo}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap place-content-between gap-[1vw] bg-transparent p-1 font-acumin md:gap-4">
      <CardTimer time={rest.weeks} timeInfo="Weeks" />
      <CardTimer time={rest.days} timeInfo="Days" />
      <CardTimer time={rest.hours} timeInfo="Hr" />
      {/* <CardTimer time={rest.minutes} timeInfo="Min" /> */}
      <CardTimer time={rest.seconds} timeInfo="Sec" isSec={true} />
    </div>
  );
}
