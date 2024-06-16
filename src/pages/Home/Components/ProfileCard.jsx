export default function ProfileCard({ profileinfo }) {
    function handleClick() {
        window.open('https://www.instagram.com/widsespol/', '_blank');
    }
    return (
        <div className="flex place-content-start overflow-hidden !w-full max-sm:ml-10 mx-10 max-sm:mb-5">
            <div className="flex items-center">
                <img src={profileinfo.profile_image} alt="Logo" className="!w-32 !h-32 max-sm:!w-20 max-sm:!h-20 rounded-full hover:opacity-40" />
                <div className="gap-5 px-10" onClick={handleClick}> 
                    <p className="text-3xl max-sm:text-xl font-bold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-2xl">{profileinfo.name}</p>
                    <p className="text-3xl max-sm:text-xl  text-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-2xl">{profileinfo.user}</p>
                </div>
            </div>
        </div>
    )
}