import { Request } from "express";

export interface RequestWithLocale extends Request {
  locale?: string;
}
