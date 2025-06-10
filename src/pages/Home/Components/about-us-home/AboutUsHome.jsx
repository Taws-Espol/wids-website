const AboutUsHome = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 w-full py-5 px-5 mt-10 justify-center items-center ">
      <div className="lg:w-1/2">
        <div className="flex flex-col lg:space-y-10 space-y-5">
          <h1 className="text-[5vw] md:text-[3vw] lg:text-[2.5vw] 5xl:text-[3.8em]">
            Empowering Women in Data Science: A Source of Inspiration
          </h1>
          <p className="lg:text-xl text-[3vw] mt-[2vw] 5xl:mt-10 md:text-[2vw] lg:text-[1.5vw] 5xl:text-[2.2em]">
            Lorem ipsum dolor sit amet consectetur. Vitae amet consequat
            pellentesque quam amet tempor semper dis. Consectetur nunc amet
            suspendisse massa faucibus nunc cum. Lorem ipsum dolor sit amet
            consectetur. Vitae amet consequat pellentesque quam amet tempor
            semper dis. Consectetur nunc amet suspendisse massa faucibus nunc
            cum. Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 py-4 flex justify-center items-center px-5">
        <img
          src="/assets/images/collage-about-us.png"
          alt="collage"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default AboutUsHome;
