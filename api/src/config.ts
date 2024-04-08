import path from "node:path";

export const fallbackLocale = process.env.FALLBACK_LOCALE ?? "en-GB";
export const dataPath =
  process.env.DATA_PATH ?? path.resolve(__dirname, "../res/dummy");
export const serverPort = parseInt(process.env.SERVER_PORT ?? "15000");
export const serverHostname = process.env.SERVER_HOSTNAME ?? "localhost";
export const corsOrigins = (
  process.env.CORS_ORIGINS ?? "http://localhost:5173"
).split(",");
export const privacyMode = (process.env.PRIVACY_MODE ?? "true") === "true";
