function Contador({number,text,color,className}) {
    return (
    <div className={`mb-4 md:mb-0 max-sm:w-[100px] max-md:w-[200px] max-xl:w-[300px]  ${className} max-xl:text-center`}>
        <p className="text-3xl max-xl:text-xl text-gray-800">Over</p>
        <h1 className={`text-9xl max-xl:text-6xl font-bold ${color}`}>{number}</h1>
        <p className="text-3xl max-xl:text-xl text-gray-800">{text}</p>
    </div>
    )
}

export default Contador
