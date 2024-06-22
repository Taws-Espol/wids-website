export default function AboutUsCard() {
  return (
    <div className="relative">
      <img
        className="absolute top-[-15px] right-[-15px] w-[7rem] z-[-1]"
        src="/assets/about-us/rectangle.svg"
      />
      <img
        className="absolute bottom-[-35px] left-[-35px] w-[10rem] z-[-1]"
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
