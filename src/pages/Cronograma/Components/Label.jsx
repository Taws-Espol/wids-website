export function Label({type, hiddenDiv}){
    let backgroundColor;
    switch (type) {
        case "Conferencia":
            backgroundColor = "bg-blue-500";
            break;
        case "Talleres":
            backgroundColor = "bg-cyan-300";
            break;
        default:
            backgroundColor = "bg-gray-200";
    }
    return(
        <div class="flex flex-row" onClick={hiddenDiv}>
            <div class={`${backgroundColor} w-[450px] h-12 text-white font-bold py-2 px-4 flex items-center rounded-l-full overflow-hidden`}>
                <p className="text-2xl text-black px-8">{type}</p>
            </div>
            <div class= {`${backgroundColor} h-12 w-8 triangle`}>
            </div>
        </div>
    )

}