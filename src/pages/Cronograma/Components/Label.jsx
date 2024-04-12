export function Label({type, hiddenDiv}){
    let backgroundColor;
    switch (type) {
        case "Conferencias":
            backgroundColor = "bg-blue-label";
            break;
        case "Talleres":
            backgroundColor = "bg-cian-label";
            break;
        default:
            backgroundColor = "bg-blue-label";
    }
    return(
        <div class="flex flex-row" onClick={hiddenDiv}>
            <div class={`${backgroundColor} w-[450px] h-12 text-white font-bold py-2 px-4 flex items-center rounded-l-full overflow-hidden border-r-0 font-acumin max-xsm:w-[284px] max-sm:w-[355px]`}>
                <p className="text-2xl text-black px-8 max-xsm:px-8 max-xsm:text-xl">{type}</p>
            </div>
            <div class= {`${backgroundColor} h-12 w-8 triangle max-xsm:w-4 max-sm:w-5`}>
            </div>
        </div>
    )

}