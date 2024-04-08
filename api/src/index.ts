import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { RequestWithLocale } from "./model";
import DataService from "./data.service";
import {
  corsOrigins,
  fallbackLocale,
  serverHostname,
  serverPort,
} from "./config";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = serverPort;
const hostname = serverHostname;

app.use(cors({ origin: corsOrigins }));
console.log("CORS policy is allowing requests from the following origins:");
console.log(corsOrigins);

app.get("/", (_: Request, res: Response) => res.send("OK"));

app.get("/cv/data", async (req: RequestWithLocale, res: Response) => {
  const locale = req.query.locale?.toString() ?? fallbackLocale;
  return res.json(await DataService.getCvData(locale));
});
app.get("/cv/projects", async (req: RequestWithLocale, res: Response) => {
  const locale = req.query.locale?.toString() ?? fallbackLocale;
  return res.json(await DataService.getProjects(locale));
});
app.get("/cv/personal-info", async (req: RequestWithLocale, res: Response) => {
  const locale = req.query.locale?.toString() ?? fallbackLocale;
  return res.json(await DataService.getPersonalInfo(locale));
});
app.get("/cv/ja", async (_req: RequestWithLocale, res: Response) => {
  return res.json(await DataService.getJapaneseCvData());
});

app.listen(port, hostname, () => {
  console.log(`⚡️[server]: Server is running at http://${hostname}:${port}`);
});
