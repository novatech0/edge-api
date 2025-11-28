// URLs del backend Spring Boot
export const BACKEND_BASE_URL =
  process.env.BACKEND_URL || "https://agrotech.ddns.net";

export const cropIotEndpoint = (cropId: number) =>
  `${BACKEND_BASE_URL}/api/v1/crops/${cropId}/iot`;

export const thresholdsEndpoint = (cropId: number) =>
  `${BACKEND_BASE_URL}/api/v1/crops/${cropId}/thresholds`;
