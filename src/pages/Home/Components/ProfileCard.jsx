export default function ProfileCard({ profileinfo }) {
  function handleClick() {
    window.open('https://www.instagram.com/widsespol/', '_blank');
  }
  return (
    <div className="mx-10 flex !w-full place-content-start overflow-hidden max-sm:mb-5 max-sm:ml-10">
      <div className="flex items-center">
        <img
          src={profileinfo.profile_image}
          alt="Logo"
          className="!h-32 !w-32 rounded-full hover:opacity-40 max-sm:!h-20 max-sm:!w-20"
        />
        <div className="gap-5 px-10" onClick={handleClick}>
          <p className="text-3xl font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-2xl max-sm:text-xl">
            {profileinfo.name}
          </p>
          <p className="text-3xl text-gray-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-2xl max-sm:text-xl">
            {profileinfo.user}
          </p>
        </div>
      </div>
    </div>
  );
}
