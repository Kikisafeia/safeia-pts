import React, { useState } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { JobDescriptionStep } from './components/JobDescriptionStep';
import { RisksStep } from './components/RisksStep';
import { PreventiveMeasuresStep } from './components/PreventiveMeasuresStep';
import { EquipmentStep } from './components/EquipmentStep';

const steps = [
  {
    id: 1,
    name: 'Descripción',
    description: 'Información básica del trabajo',
  },
  {
    id: 2,
    name: 'Riesgos',
    description: 'Identificación de riesgos',
  },
  {
    id: 3,
    name: 'Medidas',
    description: 'Medidas preventivas',
  },
  {
    id: 4,
    name: 'Equipos',
    description: 'Equipos y herramientas',
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-8">
                Generador de Procedimientos de Trabajo Seguro
              </h1>
              
              <div className="mb-8">
                <StepIndicator steps={steps} currentStep={currentStep} />
              </div>

              <div className="mt-8">
                {currentStep === 1 && <JobDescriptionStep onNext={handleNext} />}
                {currentStep === 2 && <RisksStep onNext={handleNext} onBack={handleBack} />}
                {currentStep === 3 && <PreventiveMeasuresStep onNext={handleNext} onBack={handleBack} />}
                {currentStep === 4 && <EquipmentStep onBack={handleBack} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;