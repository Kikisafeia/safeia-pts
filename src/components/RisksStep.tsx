import { usePTSStore } from '../store/ptsStore';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function RisksStep({ onNext, onBack }: Props) {
  const { formData, toggleRisk, updateRisks } = usePTSStore();
  const [newRisk, setNewRisk] = useState('');

  const handleAddRisk = () => {
    if (newRisk.trim()) {
      updateRisks([
        ...formData.risks,
        {
          id: `risk-${formData.risks.length}`,
          description: newRisk.trim(),
          selected: true,
        },
      ]);
      setNewRisk('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Riesgos Identificados</h3>
        <p className="text-sm text-gray-500">
          Seleccione los riesgos relevantes para este trabajo y añada nuevos si es necesario.
        </p>
      </div>

      <div className="space-y-4">
        {formData.risks.map((risk) => (
          <div key={risk.id} className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                type="checkbox"
                checked={risk.selected}
                onChange={() => toggleRisk(risk.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">{risk.description}</label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newRisk}
          onChange={(e) => setNewRisk(e.target.value)}
          placeholder="Añadir nuevo riesgo..."
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleAddRisk}
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