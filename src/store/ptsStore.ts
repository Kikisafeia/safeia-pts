import { create } from 'zustand';
import { PTSFormData, Risk, PreventiveMeasure, Equipment, EmergencyMeasure } from '../types';

interface PTSStore {
  formData: PTSFormData;
  setBasicInfo: (info: Partial<PTSFormData>) => void;
  updateRisks: (risks: Risk[]) => void;
  toggleRisk: (riskId: string) => void;
  updatePreventiveMeasures: (measures: PreventiveMeasure[]) => void;
  updateEquipment: (equipment: Equipment[]) => void;
  updateEmergencyMeasures: (measures: EmergencyMeasure[]) => void;
  reset: () => void;
}

const initialState: PTSFormData = {
  title: '',
  objective: '',
  scope: '',
  responsibilities: '',
  definitions: '',
  jobDescription: '',
  department: '',
  date: new Date().toISOString().split('T')[0],
  supervisor: '',
  reviewFrequency: '',
  reviewer: '',
  risks: [],
  preventiveMeasures: [],
  equipment: [],
  emergencyMeasures: [],
};

export const usePTSStore = create<PTSStore>((set) => ({
  formData: initialState,
  setBasicInfo: (info) =>
    set((state) => ({
      formData: { ...state.formData, ...info },
    })),
  updateRisks: (risks) =>
    set((state) => ({
      formData: { ...state.formData, risks },
    })),
  toggleRisk: (riskId) =>
    set((state) => ({
      formData: {
        ...state.formData,
        risks: state.formData.risks.map((risk) =>
          risk.id === riskId
            ? { ...risk, selected: !risk.selected }
            : risk
        ),
      },
    })),
  updatePreventiveMeasures: (measures) =>
    set((state) => ({
      formData: { ...state.formData, preventiveMeasures: measures },
    })),
  updateEquipment: (equipment) =>
    set((state) => ({
      formData: { ...state.formData, equipment },
    })),
  updateEmergencyMeasures: (measures) =>
    set((state) => ({
      formData: { ...state.formData, emergencyMeasures: measures },
    })),
  reset: () => set({ formData: initialState }),
}));