export function Contador({number,text,color,className, position}) {
    return (
    <div className={`mb-4 md:mb-0 max-sm:w-[100px] max-md:w-[200px] max-xl:w-[300px]  ${className} max-xl:text-center flex flex-col place-content-center place-items-center` }>
        <h1 className={`text-9xl max-xl:text-6xl font-bold ${color} relative`}>{number}</h1>
        <p className={`absolute top-3 left-20 text-5xl max-xl:text-6xl font-bold ${color} max-xl:hidden`}>{position}</p>
        <p className="text-3xl max-xl:text-xl text-gray-800">{text}</p>
    </div>
    )
}
