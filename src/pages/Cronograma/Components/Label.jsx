export function Label({ type, hiddenDiv, stateHidden }) {
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
  const breakpoint = 1025;
  const checkSize = () => {
    if (window.innerWidth < breakpoint) {
      hiddenDiv();
    }
  };
  return (
    <div class="flex flex-row" onClick={checkSize}>
      <div
        class={`${backgroundColor} w-[450px] ${stateHidden ? "h-44  place-content-center rounded-md" : "h-12 rounded-l-full"}  font-bold p-0 flex items-center mr-0 overflow-hidden border-r-0 font-acumin max-xsm:w-[284px] max-sm:w-[355px]`}
      >
        <p
          className={`${stateHidden ? "text-4xl" : "text-2xl max-xsm:px-8 max-xsm:text-xl"} text-black px-8`}
        >
          {type}
        </p>
      </div>
      <div
        class={`${backgroundColor} ${stateHidden ? "h-44" : "h-12"} w-8 triangle mr-0 max-xsm:w-4  border-l-0 max-sm:w-5`}
      ></div>
    </div>
  );
}
