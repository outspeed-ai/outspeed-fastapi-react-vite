import { z } from "zod";

const envSchema = z.object({
  OPEN_WEATHER_MAP_API_KEY: z.string().optional(),
});

export const env = envSchema.parse({
  OPEN_WEATHER_MAP_API_KEY: import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY,
});
