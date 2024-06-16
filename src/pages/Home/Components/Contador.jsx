export function Contador({number,text,color,className, position}) {
    return (
    <div className={`mb-4 md:mb-0 max-md:w-[38vw]  ${className} max-md:text-center flex flex-col place-content-center place-items-center` }>
        <h1 className={`sm:text-[9vw] text-[11vw] md:text-[8vw] font-bold ${color} relative`}>{number}</h1>
        <p className={`md:absolute md:top-[1.2vw] md:left-[5vw] md:text-[3vw] max-md:hidden font-bold ${color}`}>{position}</p>
        <p className="sm:text-[2.2vw] text-[3vw] md:text-[2vw] text-gray-800">{text}</p>
    </div>
    )
}
