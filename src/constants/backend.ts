// URLs del backend Spring Boot

export const BACKEND_BASE_URL =
  process.env.BACKEND_URL || "http://localhost:8080";
  
export const cropEndpoint = (cropId: number) =>
  `${BACKEND_BASE_URL}/api/v1/crop/${cropId}`;

export const temperatureEndpoint = (cropId: number) =>
  `${BACKEND_BASE_URL}/api/v1/crop/${cropId}/temperature`;

export const humidityEndpoint = (cropId: number) =>
  `${BACKEND_BASE_URL}/api/v1/crop/${cropId}/humidity`;

export const thresholdsEndpoint = (cropId: number) =>
  `${BACKEND_BASE_URL}/api/v1/crop/${cropId}/thresholds`;

export const waterTankEndpoint = (tankId: number) =>
  `${BACKEND_BASE_URL}/api/v1/water-tanks/${tankId}/water-remaining`;

export const iotDataEndpoint = `${BACKEND_BASE_URL}/api/v1/iot/data`;
