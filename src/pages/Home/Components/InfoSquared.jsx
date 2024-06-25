export function InfoSquared({number,text,color}) {
    return (
        <div className={`h-[360px] flex flex-col aspect-square ${color} text-5xl text-white font-bold place-content-center place-items-center text-center px-5 gap-5 max-sm:h-[330px] max-sm:text-4xl`}>
            <p className="max-sm:text-5xl text-7xl">
                {number}
            </p>
            <p>
                {text}
            </p>
        </div>
    )
}
