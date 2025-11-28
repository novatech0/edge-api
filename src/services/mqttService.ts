import mqtt, { MqttClient } from "mqtt";
import dotenv from "dotenv";
import { MQTT_BROKER, MQTT_TOPIC } from "../constants/mqtt";
import { SensorData } from "../types/sensor";
import { sendDataToBackend, getThresholdsFromBackend } from "./backendService";

dotenv.config();

export class MqttService {
  private client: MqttClient;
  private latestData: SensorData | null = null;
  private latestCropId: number | null = null;

  constructor() {
    this.client = mqtt.connect(MQTT_BROKER);
    this.client.on("connect", this.onConnect);
    this.client.on("message", this.onMessage);
  }

  private onConnect = () => {
    console.log("Connected to MQTT broker");
    this.client.subscribe(MQTT_TOPIC, (err) => {
      if (err) console.error("MQTT subscription error:", err);
      else console.log("Subscribed to topic:", MQTT_TOPIC);
    });
  };

  private onMessage = async (_topic: string, message: Buffer) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.id) this.latestCropId = Number(data.id);

      this.latestData = {
        ...data,
        timestamp: Date.now(),
      };

      console.log("Received MQTT data:", this.latestData);

      if (!this.latestCropId) {
        console.error("No cropId available yet");
        return;
      }

      await sendDataToBackend(this.latestData, this.latestCropId);

      const thresholds = await getThresholdsFromBackend(this.latestCropId);

      if (thresholds) {
        const formatted = {
          temperature_max: thresholds.temperatureMaxThreshold,
          humidity_min: thresholds.humidityMinThreshold,
          max_volume: thresholds.tankMaxVolume,
          tank_height: thresholds.tankHeight,
        };

        console.log("Sending thresholds to Wokwi:", formatted);

        this.client.publish(
          `${MQTT_TOPIC}/config`,
          JSON.stringify(formatted)
        );
      }

    } catch (error) {
      console.error("Error parsing MQTT message:", error);
    }
  };

  public getLatestData(): SensorData | null {
    return this.latestData;
  }

  public getLatestCropId(): number | null {
    return this.latestCropId;
  }
}
