export default function AboutUsCard() {
  return (
    <div className="relative">
      <img
        className="absolute right-[-15px] top-[-15px] z-[-1] w-[7rem]"
        src="/assets/about-us/rectangle.svg"
      />
      <img
        className="absolute bottom-[-35px] left-[-35px] z-[-1] w-[10rem]"
        src="/assets/about-us/circle.svg"
      />
      <img
        className="absolute bottom-0 right-0 w-[15rem] bg-white"
        src="/assets/about-us/logo_wids.svg"
      />
      <img
        className="w-[35rem]"
        src="/assets/about-us/conference.webp"
        alt="Imagen de evento"
      />
    </div>
  );
}
