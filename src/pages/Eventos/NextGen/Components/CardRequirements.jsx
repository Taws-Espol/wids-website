export function CardRequirement({ requirement }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="flex justify-center w-full mb-4">
        <img
          src={requirement.imagen_r}
          alt={requirement.alt}
          className="h-48 max-w-full object-contain"
        />
      </div>
      <div className="flex justify-center w-full">
        <p className="text-xl px-4 text-center">{requirement.info}</p>
      </div>
    </div>
  );
}
