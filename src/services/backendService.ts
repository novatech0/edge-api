import axios from "axios";
import dotenv from "dotenv";

import {
  cropEndpoint,
  temperatureEndpoint,
  humidityEndpoint,
  thresholdsEndpoint,
  waterTankEndpoint,
  iotDataEndpoint
} from "../constants/backend";

import { SensorData } from "../types/sensor";

dotenv.config();
 
export async function sendDataToBackend(
  data: SensorData,
  cropId: number,
  tankId: number
): Promise<void> {
  try {
    await axios.patch(temperatureEndpoint(cropId), { temperature: data.temperature });
    await axios.patch(humidityEndpoint(cropId), { humidity: data.humidity });
    await axios.patch(waterTankEndpoint(tankId), { waterAmount: data.volume });

    await axios.post(iotDataEndpoint, {
      temperature: data.temperature,
      humidity: data.humidity,
      volume: data.volume,
      timestamp: data.timestamp,
    });

    console.log("Datos enviados correctamente al backend");
  } catch (error) {
    console.error("Error enviando datos al backend:", error);
  }
}

 
export async function getThresholdsFromBackend(
  cropId: number
): Promise<{
  temperature_max: number;
  humidity_min: number;
  tank_volume: number;
  tank_height: number;
} | null> {
  try {
    const response = await axios.get(thresholdsEndpoint(cropId));
    const data = response.data;

    return {
      temperature_max: data.temperatureMaxThreshold,
      humidity_min: data.humidityMinThreshold,
      tank_volume: data.tankMaxVolume,
      tank_height: data.tankHeight,
    };
  } catch (error) {
    console.error("Error obteniendo thresholds del backend:", error);
    return null;
  }
}
 
export async function getCropInfo(
  cropId: number
): Promise<any | null> {
  try {
    const response = await axios.get(cropEndpoint(cropId));
    return response.data;
  } catch (error) {
    console.error("Error obteniendo info del crop:", error);
    return null;
  }
}
