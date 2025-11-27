// URLs del backend Spring Boot

export const BACKEND_BASE_URL =
  process.env.BACKEND_URL || "https://agrotech.ddns.net";

export const cropIotEndpoint = (cropId: number) =>
  `${BACKEND_BASE_URL}/api/v1/crops/1/iot`;


//Se implementará mas adelante
//export const thresholdsEndpoint = (cropId: number) =>
  //`${BACKEND_BASE_URL}/api/v1/crop/${cropId}/thresholds`;

