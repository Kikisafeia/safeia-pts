import { usePTSStore } from '../store/ptsStore';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Equipment } from '../types';
import { generatePDF } from '../utils/pdfGenerator';

interface Props {
  onBack: () => void;
}

export function EquipmentStep({ onBack }: Props) {
  const { formData, updateEquipment } = usePTSStore();
  const [newEquipment, setNewEquipment] = useState('');
  const [equipmentType, setEquipmentType] = useState<'tool' | 'protection'>('tool');

  const handleAddEquipment = () => {
    if (newEquipment.trim()) {
      const newItem: Equipment = {
        id: `equipment-${formData.equipment.length}`,
        name: newEquipment.trim(),
        type: equipmentType,
        required: true,
      };
      updateEquipment([...formData.equipment, newItem]);
      setNewEquipment('');
    }
  };

  const handleGeneratePDF = () => {
    generatePDF(formData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Equipos y Herramientas</h3>
        <p className="text-sm text-gray-500">
          Revise y ajuste los equipos y herramientas necesarios para el trabajo.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Equipos de Protección</h4>
        <ul className="space-y-2">
          {formData.equipment
            .filter((item) => item.type === 'protection')
            .map((item) => (
              <li key={item.id} className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{item.name}</span>
              </li>
            ))}
        </ul>

        <h4 className="font-medium text-gray-900">Herramientas</h4>
        <ul className="space-y-2">
          {formData.equipment
            .filter((item) => item.type === 'tool')
            .map((item) => (
              <li key={item.id} className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{item.name}</span>
              </li>
            ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            placeholder="Añadir nuevo equipo o herramienta..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <select
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value as 'tool' | 'protection')}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="tool">Herramienta</option>
            <option value="protection">Protección</option>
          </select>
          <button
            type="button"
            onClick={handleAddEquipment}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
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
          onClick={handleGeneratePDF}
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generar PTS
        </button>
      </div>
    </div>
  );
}