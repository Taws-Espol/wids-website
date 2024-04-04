import Contador from "./Contador";

function Info() {
    return (
        <div className="flex flex-wrap ml-2 mr-2 justify-center">
            <div className="flex flex-wrap info-container xl:w-4/5 lg:w-[90vw] rounded-3xl">
                <div className="flex items-start flex-wrap justify-around pl-0 p-3 pb-5">
                    <Contador number={38} text={"Lectures"}/>
                    <Contador number={15} text={"Speakers"}/>
                    <Contador number={18} text={"Master-Classes"}/>
                    <Contador number={2500} text={"Participants"}/>
                </div>
                <div className="flex-col-reverse m-4 p-4 pr-0">
                    <h2 className="font-medium">FRONT-SPEAK 2023</h2>
                    <p className="mt-2" style={{fontSize: '0.8em'}}>Your chance get in touch with Creators and Maintainers from Biggest companies. 
                        Understand the latest trend in development.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Info
