function StepIndicator({ currentStep }) {
    const STEPS = ['Your Info', 'Select Plan', 'Add-Ons', 'Summary'];

    return (
            <nav aria-label="Step Indicator" className="font-body leading-[1.2] step-indicator-bg h-43 pt-8 md:h-142 md:w-51.5 md:rounded-lg md:px-6 md:pt-10">
                <ol className="flex justify-center gap-4 md:flex-col md:gap-8">
                {STEPS.map((label, index) => {
                    const isActive = index === currentStep

                    return (
                        <li 
                        key={label}
                        aria-current={isActive ? 'step' : undefined}
                        className="flex items-center gap-4"
                        >
                        <span className={`grid size-8 place-items-center rounded-full border font-bold ${isActive ? 'border-transparent bg-blue-200 text-blue-950' : 'border-white text-white text-sm tracking-[0.0625em]'}`}>
                            {index + 1}
                        </span>
                        <span className="hidden md:block uppercase">
                            <span className="block text-xs text-blue-300">Step {index + 1}</span>
                            <span className="block font-bold text-white tracking-[0.0625em] text-sm">{label}</span>
                        </span>

                        </li>
                    )
                })}
                </ol>
            </nav>
        );
}

export default StepIndicator;