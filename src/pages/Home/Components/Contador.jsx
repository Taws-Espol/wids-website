export function Contador({ number, text, color, className, position }) {
  return (
    <div
      className={`mb-4 max-md:w-[38vw] md:mb-0 ${className} flex flex-col place-content-center place-items-center max-md:text-center`}
    >
      <h1
        className={`text-[11vw] font-bold sm:text-[9vw] md:text-[8vw] ${color} relative`}
      >
        {number}
      </h1>
      <p
        className={`font-bold max-md:hidden md:absolute md:left-[5vw] md:top-[1.2vw] md:text-[3vw] ${color}`}
      >
        {position}
      </p>
      <p className="text-[3vw] text-gray-800 sm:text-[2.2vw] md:text-[2vw]">
        {text}
      </p>
    </div>
  );
}
