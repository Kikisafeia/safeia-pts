import axios from 'axios';
import { AZURE_CONFIG } from '../config/azure';

interface OpenAIResponse {
  risks?: string[];
  preventiveMeasures?: string[];
  equipment?: string[];
  emergencyMeasures?: string[];
  definitions?: string;
}

export class OpenAIService {
  private static instance: OpenAIService;
  private readonly apiVersion = '2023-05-15';

  private constructor() {}

  static getInstance(): OpenAIService {
    if (!this.instance) {
      this.instance = new OpenAIService();
    }
    return this.instance;
  }

  private async makeRequest(prompt: string) {
    try {
      const response = await axios.post(
        `${AZURE_CONFIG.endpoint}/openai/deployments/${AZURE_CONFIG.deploymentName}/chat/completions?api-version=${this.apiVersion}`,
        {
          messages: [
            {
              role: 'system',
              content: `You are a workplace safety expert assistant. For the given job description, provide comprehensive safety recommendations including:
              - Key terms and definitions related to the task
              - Potential safety risks
              - Preventive measures for each identified risk
              - Required personal protective equipment (PPE) and tools
              - Emergency response measures
              
              Format your response as a detailed JSON object.`,
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': AZURE_CONFIG.apiKey,
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Azure OpenAI:', error);
      throw new Error('Failed to get AI suggestions');
    }
  }

  async getSuggestions(jobDescription: string): Promise<OpenAIResponse> {
    const prompt = `
      Based on this job description, provide a comprehensive safety analysis:

      "${jobDescription}"

      Return your response as JSON with this structure:
      {
        "definitions": "Key terms and concepts related to this task, formatted as a paragraph",
        "risks": ["Detailed risk 1", "Detailed risk 2", ...],
        "preventiveMeasures": ["Specific measure 1", "Specific measure 2", ...],
        "equipment": ["PPE/tool item 1", "PPE/tool item 2", ...],
        "emergencyMeasures": ["Emergency measure 1", "Emergency measure 2", ...]
      }

      Make all items specific and detailed, not generic.
    `;

    try {
      const response = await this.makeRequest(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      return {
        definitions: '',
        risks: [],
        preventiveMeasures: [],
        equipment: [],
        emergencyMeasures: [],
      };
    }
  }
}