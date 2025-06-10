export function Label({ type, hiddenDiv, stateHidden }) {
  let backgroundColor;
  switch (type) {
    case 'Conferencias':
      backgroundColor = 'bg-blue-label';
      break;
    case 'Talleres':
      backgroundColor = 'bg-cian-label';
      break;
    default:
      backgroundColor = 'bg-blue-label';
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
        class={`${backgroundColor} w-[450px] ${stateHidden ? 'h-44 place-content-center rounded-md' : 'h-12 rounded-l-full'} font-acumin mr-0 flex items-center overflow-hidden border-r-0 p-0 font-bold max-sm:w-[355px] max-xsm:w-[284px]`}
      >
        <p
          className={`${stateHidden ? 'text-4xl' : 'text-2xl max-xsm:px-8 max-xsm:text-xl'} px-8 text-black`}
        >
          {type}
        </p>
      </div>
      <div
        class={`${backgroundColor} ${stateHidden ? 'h-44' : 'h-12'} triangle mr-0 w-8 border-l-0 max-sm:w-5 max-xsm:w-4`}
      ></div>
    </div>
  );
}
