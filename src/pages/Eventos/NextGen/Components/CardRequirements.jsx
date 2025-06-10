export function CardRequirement({ requirement }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="mb-4 flex w-full justify-center">
        <img
          src={requirement.imagen_r}
          alt={requirement.alt}
          className="h-48 max-w-full object-contain"
        />
      </div>
      <div className="flex w-full justify-center">
        <p className="px-4 text-center text-xl">{requirement.info}</p>
      </div>
    </div>
  );
}
