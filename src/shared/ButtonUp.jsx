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

    window.addEventListener("scroll", toggleVisibility);

    return () => {
        window.removeEventListener("scroll", toggleVisibility);
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
        <div    className={`  fixed 
                            flex
                            right-5 bottom-5 
                            w-14 h-14 
                            bg-[rgba(74,185,105)]
                            xl:hover:bg-slate-400 
                            rounded-full 
                            z-50 
                            px-4 py-4
                            border-2 border-white
                            cursor-pointer 
                            justify-center items-center
                            transition-all duration-300 ease-in-out
                            ${isVisible ? 'opacity-100' : 'opacity-0'} `}
                onClick={scrollUp}>
            <div className="">
                <img src="/src/assets/ButtonUP/icons8-chevron-para-arriba-30 (1).png" alt="" />
            </div>
        </div>

    );
}

export default ButtonUp
