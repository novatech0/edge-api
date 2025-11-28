import express, { Request, Response } from "express";
import cors from "cors";
import { MqttService } from "./services/mqttService";
import { SensorData } from "./types/sensor";
import { getThresholdsFromBackend } from "./services/backendService";

const mqttService = new MqttService();

const app = express();
app.use(cors());

app.get("/thresholds", async (req: Request, res: Response) => {
  const cropId = mqttService.getLatestCropId();

  if (!cropId) {
    res.status(400).json({
      error: "No cropId has been received from any IoT device yet.",
    });
    return;
  }

  const thresholds = await getThresholdsFromBackend(cropId);

  if (!thresholds) {
    res.status(500).json({ error: "Failed to load thresholds." });
    return;
  }

  const formatted = {
    temperature_max: thresholds.temperatureMaxThreshold,
    humidity_min: thresholds.humidityMinThreshold,
    max_volume: thresholds.tankMaxVolume,
    tank_height: thresholds.tankHeight,
  };

  res.json(formatted);
});

app.get("/data", (req: Request, res: Response) => {
  const latestData: SensorData | null = mqttService.getLatestData();

  if (latestData) res.json(latestData);
  else res.status(404).json({ error: "No data received yet" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Edge API listening on port ${PORT}`);
});
