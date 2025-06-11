import React, { useState, useEffect, useRef } from "react";
import useIntersectionObserver from "../../../shared/Hook_scroll";

// The ProgressiveInfoSquared component displays a number that counts up to a target value
// when it enters the viewport. The number is formatted with commas and is animated using
// IntersectionObserver and Animate.css for smooth animation effects.
export function ProgressiveInfoSquared({ number, text, color, m_top, delay }) {
  const [count, setCount] = useState(0); // State to keep track of the current count
  const ref = useRef(null); // Reference to the DOM element for IntersectionObserver
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 }); // Hook to detect if the component is visible

  // The useEffect hook will trigger when the component is visible and start counting the number.
  useEffect(() => {
    if (!isVisible) return; // If the component is not visible, don't start the animation

    const duration = 2000; // Total duration of the counting animation (in milliseconds)
    const end =
      typeof number === "string" && number.startsWith("+")
        ? parseInt(number.slice(1)) // If the number starts with a "+" symbol, it converts to an integer
        : number; // Otherwise, it uses the number directly
    if (end === 0) return; // If the target number is 0, don't animate

    // Calculate the increment value based on the total duration and the number to reach
    const increment = end / (duration / 20); // Faster increment for quicker counting
    let start = 0; // Start count from 0
    const timer = setInterval(() => {
      start += increment; // Increment the count in each interval
      setCount(Math.min(Math.round(start), end)); // Update the count, ensuring it doesn't exceed the target number
      if (start >= end) clearInterval(timer); // Stop the counting once the target is reached
    }, 20); // Update the count every 20 milliseconds for smooth animation

    // Cleanup: Clear the interval when the component unmounts or if the effect reruns
    return () => clearInterval(timer);
  }, [number, isVisible]); // Depend on the 'number' and 'isVisible' values

  return (
    // The container div has TailwindCSS classes for styling and the animation effect
    <div
      ref={ref} // Reference to the DOM element for IntersectionObserver
      className={`w-auto xl:mr-[-30px] border-black flex flex-col mt-3 ${color} ${m_top} text-5xl font-bold place-content-center place-items-center text-center px-5 gap-5 xl:gap-1  max-sm:text-sm max-md:text-xl transition-all duration-1000 ${isVisible ? "animate__animated animate__fadeInLeft" : "opacity-0"}`}
      style={{ animationDelay: `${delay}s` }} // Set a delay for the animation based on the 'delay' prop
    >
      {/* Label text indicating that the number is a cumulative count */}
      <p className="text-[#0f0f0f] w-full text-[12px] text-center xl:text-start">
        MÁS DE
      </p>

      {/* Display the counting number, formatted with commas for readability */}
      <p className="w-full text-[2.4rem] xl:text-[5rem] text-center xl:text-start">
        {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        {/* Format number with commas */}
      </p>

      {/* Display the label text (e.g., "Ediciones", "Embajadores") */}
      <p className="w-[130px] xl:w-[200px] text-green-950 text-[15px] xl:text-[20px] font-normal  text-center xl:text-start">
        {text}
      </p>
    </div>
  );
}
