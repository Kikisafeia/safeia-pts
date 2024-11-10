import { jsPDF } from 'jspdf';
import { PTSFormData } from '../types';

export function generatePDF(data: PTSFormData) {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  // Helper function to add text with proper line breaks
  const addText = (text: string, fontSize: number, indent: number = 0) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, doc.internal.pageSize.width - 2 * margin - indent);
    doc.text(lines, margin + indent, y);
    y += (lines.length * fontSize * 0.3527) + 5;
    if (y > doc.internal.pageSize.height - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Title
  doc.setFontSize(16);
  doc.text(data.title, margin, y);
  y += 15;

  // Sections
  const sections = [
    { title: 'Objetivo', content: data.objective },
    { title: 'Alcance', content: data.scope },
    { title: 'Responsabilidades', content: data.responsibilities },
    { title: 'Definiciones', content: data.definitions },
  ];

  sections.forEach(section => {
    doc.setFontSize(14);
    doc.text(section.title + ':', margin, y);
    y += 8;
    addText(section.content, 12);
    y += 5;
  });

  // Basic Information
  addText(`Departamento: ${data.department}`, 12);
  addText(`Fecha: ${data.date}`, 12);
  addText(`Supervisor: ${data.supervisor}`, 12);
  y += 5;

  // Description
  doc.setFontSize(14);
  doc.text('Descripción de la Tarea:', margin, y);
  y += 8;
  addText(data.jobDescription, 12);
  y += 5;

  // Risks
  doc.setFontSize(14);
  doc.text('Riesgos Identificados:', margin, y);
  y += 8;
  data.risks.filter(r => r.selected).forEach(risk => {
    addText(`• ${risk.description}`, 12, 5);
  });
  y += 5;

  // Equipment
  doc.setFontSize(14);
  doc.text('Equipo de Protección Personal (EPP):', margin, y);
  y += 8;
  data.equipment
    .filter(e => e.type === 'protection')
    .forEach(item => {
      addText(`• ${item.name}`, 12, 5);
    });
  y += 5;

  // Tools
  doc.setFontSize(14);
  doc.text('Herramientas:', margin, y);
  y += 8;
  data.equipment
    .filter(e => e.type === 'tool')
    .forEach(item => {
      addText(`• ${item.name}`, 12, 5);
    });
  y += 5;

  // Preventive Measures
  doc.setFontSize(14);
  doc.text('Medidas de Prevención:', margin, y);
  y += 8;
  data.preventiveMeasures.forEach(measure => {
    addText(`• ${measure.description}`, 12, 5);
  });
  y += 5;

  // Emergency Measures
  doc.setFontSize(14);
  doc.text('Medidas de Emergencia:', margin, y);
  y += 8;
  data.emergencyMeasures.forEach(measure => {
    addText(`• ${measure.description}`, 12, 5);
  });
  y += 5;

  // Review Information
  doc.setFontSize(14);
  doc.text('Revisión y Actualización:', margin, y);
  y += 8;
  addText(`Frecuencia de revisión: ${data.reviewFrequency}`, 12, 5);
  addText(`Responsable de revisión: ${data.reviewer}`, 12, 5);

  // Save the PDF
  doc.save('procedimiento-trabajo-seguro.pdf');
}