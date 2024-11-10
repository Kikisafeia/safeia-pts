export const AZURE_CONFIG = {
  apiKey: import.meta.env.VITE_AZURE_API_KEY || '',
  endpoint: import.meta.env.VITE_AZURE_ENDPOINT || '',
  deploymentName: import.meta.env.VITE_AZURE_DEPLOYMENT_NAME || '',
};