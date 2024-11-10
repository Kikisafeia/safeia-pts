import { usePTSStore } from '../store/ptsStore';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function PreventiveMeasuresStep({ onNext, onBack }: Props) {
  const { formData, updatePreventiveMeasures } = usePTSStore();
  const [newMeasure, setNewMeasure] = useState('');
  const selectedRisks = formData.risks.filter((risk) => risk.selected);

  const handleAddMeasure = () => {
    if (newMeasure.trim()) {
      updatePreventiveMeasures([
        ...formData.preventiveMeasures,
        {
          id: `measure-${formData.preventiveMeasures.length}`,
          description: newMeasure.trim(),
          riskId: selectedRisks[0]?.id || '',
        },
      ]);
      setNewMeasure('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Medidas Preventivas</h3>
        <p className="text-sm text-gray-500">
          Revise y ajuste las medidas preventivas sugeridas para los riesgos seleccionados.
        </p>
      </div>

      {selectedRisks.map((risk) => (
        <div key={risk.id} className="space-y-4">
          <h4 className="font-medium text-gray-900">{risk.description}</h4>
          <ul className="space-y-2">
            {formData.preventiveMeasures
              .filter((measure) => measure.riskId === risk.id)
              .map((measure) => (
                <li key={measure.id} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{measure.description}</span>
                </li>
              ))}
          </ul>
        </div>
      ))}

      <div className="flex space-x-2">
        <input
          type="text"
          value={newMeasure}
          onChange={(e) => setNewMeasure(e.target.value)}
          placeholder="Añadir nueva medida preventiva..."
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleAddMeasure}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}