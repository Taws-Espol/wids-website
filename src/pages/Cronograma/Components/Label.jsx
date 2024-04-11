export function Label({type}){
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
        <div class="flex flex-row">
            <div class="bg-blue-500 w-[580px] h-12 text-white font-bold py-2 px-4 flex items-center rounded-l-full overflow-hidden">
                <span>{type}</span>
            </div>
            <div class= "bg-blue-500 h-12 w-8 triangle">
            </div>
        </div>
    )

}