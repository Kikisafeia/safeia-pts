export interface Risk {
  id: string;
  description: string;
  selected: boolean;
}

export interface PreventiveMeasure {
  id: string;
  description: string;
  riskId: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'tool' | 'protection';
  required: boolean;
}

export interface EmergencyMeasure {
  id: string;
  description: string;
}

export interface PTSFormData {
  title: string;
  objective: string;
  scope: string;
  responsibilities: string;
  definitions: string;
  jobDescription: string;
  department: string;
  date: string;
  supervisor: string;
  reviewFrequency: string;
  reviewer: string;
  risks: Risk[];
  preventiveMeasures: PreventiveMeasure[];
  equipment: Equipment[];
  emergencyMeasures: EmergencyMeasure[];
}