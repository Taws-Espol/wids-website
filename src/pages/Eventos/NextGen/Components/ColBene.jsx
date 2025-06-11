export function ColBenef({ benefit }) {
  return (
    <div className="my-4 flex flex-col items-center lg:flex-row lg:items-start">
      <div className="flex w-full justify-center lg:w-1/4 lg:justify-end lg:pr-4">
        <img
          src={benefit.image_bene}
          alt={benefit.front_title}
          className="h-20 w-20"
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center lg:mt-0 lg:w-3/4 lg:justify-start lg:pt-4">
        <div
          className="flex h-12 w-full items-center justify-center rounded-full bg-primary-blue lg:w-96 lg:justify-start"
          style={{ backgroundColor: benefit.bgColor }}
        >
          <p className="pl-4 text-center text-xl font-bold lg:text-left lg:text-2xl">
            {benefit.back_title}
          </p>
        </div>
      </div>
    </div>
  );
}
