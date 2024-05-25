function EditionCard({color,year}) {
    return (
        <div className={`relative w-[400px] h-[400px] ${color} overflow-hidden rounded-3xl flex flex-col items-start max-xxl:h-[300px] max-xxl:w-[300px] select-none`}>
            <p className='m-7 pt-2 pl-2 text-white text-3xl'>{year}</p>
            <div className="absolute bottom-[-50px] right-[-40px] w-[300px] h-[300px] bg-grey-edition rounded-full max-xxl:h-[200px] max-xxl:w-[200px]"></div>
        </div>
    )
}
export default EditionCard;