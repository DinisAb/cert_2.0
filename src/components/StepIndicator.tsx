interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps = 3 }) => {
  const getIndicatorClass = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return '';
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        return (
          <div key={step}>
            <div
              className={`step-indicator w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs ${getIndicatorClass(
                step
              )}`}
            >
              {step}
            </div>
            {index < totalSteps - 1 && <div className="w-6 h-px bg-gray-200 inline-block ml-2"></div>}
          </div>
        );
      })}
    </div>
  );
};
