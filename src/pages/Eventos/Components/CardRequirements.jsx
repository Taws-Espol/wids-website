export function CardRequirement({requirement}) {
    return (
        <div className="flex flex-col place-content-center place-items-center text-center w-1/5 min-w-[200px] h-[200px] font-acumin rounded-3xl bg-secondary-blue py-10 border-spacing-0 border-4">
            <p className="text-xl px-10">
                {requirement.info}
            </p>
        </div>
    )
}