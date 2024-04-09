import Contador from "./Contador";

function Info() {
    return (
        <div className="flex flex-wrap m-[2vw] justify-center">
            <div className="flex flex-wrap max-md:justify-center p-[0.5vw] rounded-[1vw] w-[80vw] 2xl:w-[75vw] min-h-[12vw] 2xl:min-h-[6vw] max-md:pb-[1vw]" style={{backgroundColor:'#232323', color:'#eeeeee'}}>
                <div className="flex max-md:mr-[2vw] max-md:ml-[2vw] max-md:w-full md:w-[50vw] 2xl:w-[45vw] justify-between pl-0 p-[0.1vw] md:pb-[0.4vw] max-md:pb-[3vw]">
                    <Contador number={38} text={"Lectures"}/>
                    <Contador number={15} text={"Speakers"}/>
                    <Contador number={18} text={"Master-Classes"}/>
                    <Contador number={2500} text={"Participants"}/>
                </div>
                <div className="ml-[3vw] mt-[2vw] w-full max-w-none max-md:pb-[2vw] md:max-w-[25vw] items-baseline flex-col "> 
                    <h2 className="max-md:text-[2vw] md:text-[1.25vw] font-semibold">FRONT-SPEAK 2023</h2>
                    <p className="mt-[0.5vw] max-md:text-[1.6vw] md:text-[1vw]">Your chance get in touch with Creators and Maintainers from Biggest companies. 
                        Understand the latest trend in development.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Info
