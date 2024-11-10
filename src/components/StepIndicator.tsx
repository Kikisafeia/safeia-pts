import { Check } from 'lucide-react';
import { clsx } from 'clsx';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            <div
              className={clsx(
                'group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4',
                index < currentStep
                  ? 'border-blue-600'
                  : index === currentStep
                  ? 'border-blue-400'
                  : 'border-gray-200'
              )}
            >
              <span className="text-sm font-medium">
                {index < currentStep ? (
                  <Check className="h-5 w-5 text-blue-600" />
                ) : (
                  <span
                    className={clsx(
                      'flex h-5 w-5 items-center justify-center rounded-full',
                      index === currentStep
                        ? 'border-2 border-blue-400 text-blue-400'
                        : 'border-2 border-gray-200 text-gray-500'
                    )}
                  >
                    {step.id}
                  </span>
                )}
              </span>
              <span
                className={clsx(
                  'text-sm font-medium',
                  index < currentStep
                    ? 'text-blue-600'
                    : index === currentStep
                    ? 'text-blue-400'
                    : 'text-gray-500'
                )}
              >
                {step.name}
              </span>
              <span className="text-sm text-gray-500">{step.description}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}