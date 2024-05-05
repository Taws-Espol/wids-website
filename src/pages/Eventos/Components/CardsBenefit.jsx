export function CardBenefit({benefit}) {
    return (
        <div className="relative w-64 h-64 rounded-full max-sm:w-52 max-sm:h-52 select-none">
            <div className="absolute inset-0 bg-secondary-yellow flex  flex-col items-center justify-center text-primary-dark-green font-bold text-lg transition-opacity duration-1000 hover:opacity-0
            gap-5 rounded-full" >
                <img src={benefit.image_bene} alt={benefit.front_title}  className="h-24 w-24"/>
                <p className="text-center  font-bold text-3xl">
                    {benefit.front_title}
                </p>
            </div>
            <div className="absolute inset-0 bg-primary-blue  flex items-center justify-center text-white transition-opacity duration-1000 opacity-0 hover:opacity-100
                text-3xl font-bold rounded-full max-sm:text-xl ">
                <p className="text-white text-center ">
                    {benefit.back_title}
                </p>
            </div>
        </div>
    );
}