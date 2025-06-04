export function ColBenef({ benefit }) {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start my-4">
      <div className="w-full lg:w-1/4 flex justify-center lg:justify-end lg:pr-4">
        <img
          src={benefit.image_bene}
          alt={benefit.front_title}
          className="h-20 w-20"
        />
      </div>
      <div className="w-full lg:w-3/4 flex justify-center lg:justify-start mt-4 lg:mt-0 items-center lg:pt-4">
        <div
          className="rounded-full flex items-center bg-primary-blue w-full lg:w-96 h-12 justify-center lg:justify-start"
          style={{ backgroundColor: benefit.bgColor }}
        >
          <p className="text-center lg:text-left pl-4 font-bold text-xl lg:text-2xl">
            {benefit.back_title}
          </p>
        </div>
      </div>
    </div>
  );
}
