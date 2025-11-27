import axios from "axios";
import dotenv from "dotenv";
import { cropIotEndpoint } from "../constants/backend";
import { SensorData } from "../types/sensor";

dotenv.config();

export async function sendDataToBackend(
  data: SensorData,
  cropId: number
): Promise<void> {
  try {
    // Body que requiere el backend
    const payload = {
      temperature: data.temperature,
      humidity: data.humidity,
      tankCurrentVolume: data.volume
    };

    await axios.put(cropIotEndpoint(cropId), payload);

    console.log("Datos enviados correctamente al backend (PUT /crops/{id}/iot)");
  } catch (error) {
    console.error("Error enviando datos al backend:", error);
  }
}

 
