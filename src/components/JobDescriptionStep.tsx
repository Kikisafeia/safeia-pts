import { useForm } from 'react-hook-form';
import { usePTSStore } from '../store/ptsStore';
import { OpenAIService } from '../services/openai';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface JobDescriptionForm {
  description: string;
}

interface Props {
  onNext: () => void;
}

export function JobDescriptionStep({ onNext }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { setBasicInfo, updateRisks, updatePreventiveMeasures, updateEquipment, updateEmergencyMeasures } = usePTSStore();
  const { register, handleSubmit, formState: { errors } } = useForm<JobDescriptionForm>();

  const onSubmit = async (data: JobDescriptionForm) => {
    try {
      setIsLoading(true);

      // Get AI suggestions
      const openAIService = OpenAIService.getInstance();
      const suggestions = await openAIService.getSuggestions(data.description);

      // Update store with AI-generated content
      setBasicInfo({
        title: `Procedimiento de Trabajo Seguro - ${data.description.slice(0, 50)}...`,
        objective: `Establecer los lineamientos y medidas de seguridad necesarias para realizar ${data.description} de manera segura y eficiente.`,
        scope: 'Este procedimiento aplica a todo el personal involucrado en la ejecución de esta tarea.',
        responsibilities: 'Supervisor: Asegurar el cumplimiento de este procedimiento.\nTrabajadores: Seguir las medidas de seguridad establecidas.',
        definitions: suggestions.definitions || '',
        jobDescription: data.description,
        department: 'Operaciones',
        date: new Date().toISOString().split('T')[0],
        supervisor: '',
        reviewFrequency: 'Anual',
        reviewer: 'Coordinador de Seguridad',
      });

      // Update risks
      if (suggestions.risks) {
        updateRisks(
          suggestions.risks.map((risk, index) => ({
            id: `risk-${index}`,
            description: risk,
            selected: true,
          }))
        );
      }

      // Update preventive measures
      if (suggestions.preventiveMeasures) {
        updatePreventiveMeasures(
          suggestions.preventiveMeasures.map((measure, index) => ({
            id: `measure-${index}`,
            description: measure,
            riskId: `risk-${index % (suggestions.risks?.length || 1)}`,
          }))
        );
      }

      // Update equipment
      if (suggestions.equipment) {
        updateEquipment(
          suggestions.equipment.map((item, index) => ({
            id: `equipment-${index}`,
            name: item,
            type: item.toLowerCase().includes('protección') ? 'protection' : 'tool',
            required: true,
          }))
        );
      }

      // Update emergency measures
      if (suggestions.emergencyMeasures) {
        updateEmergencyMeasures(
          suggestions.emergencyMeasures.map((measure, index) => ({
            id: `emergency-${index}`,
            description: measure,
          }))
        );
      }

      onNext();
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="description" className="block text-lg font-medium text-gray-900">
          Descripción del Trabajo
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Describa detalladamente el trabajo o tarea a realizar. El sistema generará automáticamente el PTS basado en esta descripción.
        </p>
        <textarea
          id="description"
          rows={6}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ejemplo: Instalación de paneles solares en techo inclinado a 5 metros de altura..."
          {...register('description', { 
            required: 'La descripción del trabajo es requerida',
            minLength: {
              value: 20,
              message: 'Por favor, proporcione una descripción más detallada'
            }
          })}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generando PTS...
            </>
          ) : (
            'Generar PTS'
          )}
        </button>
      </div>
    </form>
  );
}