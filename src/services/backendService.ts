import axios from "axios";
import dotenv from "dotenv";
import { cropIotEndpoint, thresholdsEndpoint } from "../constants/backend";
import { SensorData } from "../types/sensor";

dotenv.config();

export async function sendDataToBackend(
  data: SensorData | null,
  cropId: number | null
): Promise<void> {
  if (!data) {
    console.warn("sendDataToBackend: No hay datos del sensor aún.");
    return;
  }

  if (!cropId) {
    console.warn("sendDataToBackend: No hay cropId definido.");
    return;
  }

  try {
    const response = await axios.put(
      cropIotEndpoint(cropId),
      data
    );

    console.log("Datos enviados correctamente al backend");
  } catch (err) {
    console.error("Error enviando datos al backend:", err);
  }
}

export async function getThresholdsFromBackend(
  cropId: number
): Promise<any | null> {
  try {
    const response = await axios.get(thresholdsEndpoint(cropId));
    return response.data;
  } catch (error) {
    console.error("Error obteniendo thresholds del backend:", error);
    return null;
  }
}
