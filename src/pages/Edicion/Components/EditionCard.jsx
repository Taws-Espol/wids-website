function EditionCard({color,year}) {
    return (
        <div className={`relative w-[400px] h-[400px] ${color} overflow-hidden rounded-3xl flex flex-col items-start`}>
            <p className='m-7 pt-2 pl-2 text-white text-3xl'>{year}</p>
            <div className="absolute bottom-[-50px] right-[-40px] w-[300px] h-[300px] bg-grey-edition rounded-full"></div>
        </div>
    )
}
export default EditionCard;