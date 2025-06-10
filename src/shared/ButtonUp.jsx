import { useState, useEffect } from 'react';

const ButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 40) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollUp = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollUp);
      window.scrollTo(0, c - c / 10);
    }
  };
  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[rgba(74,185,105)] px-4 py-4 transition-all duration-300 ease-in-out xl:hover:bg-slate-400 ${isVisible ? 'animate-fadeIn opacity-100' : 'animate-fadeOut opacity-0'} `}
      onClick={scrollUp}
      style={{ animation: 'pulse 2s infinite' }}
    >
      <div className="">
        <img
          src="/assets/ButtonUP/icons8-chevron-para-arriba-30 (1).png"
          alt=""
          style={{ animation: 'spin 2s linear infinite' }}
        />
      </div>
    </div>
  );
};

export default ButtonUp;
