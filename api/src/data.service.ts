import * as fs from "fs";
import JSON5 from "json5";
import { dataPath, fallbackLocale, privacyMode } from "./config";
import {
  CvData,
  JapaneseCvData,
  PersonalInfo,
  Project,
} from "@shared/data.model";

export default new (class DataService {
  public async getCvData(locale: string): Promise<CvData> {
    return await this.readFileForLocale("cv-data", locale);
  }

  public async getProjects(locale: string): Promise<Project[]> {
    return await this.readFileForLocale("projects", locale);
  }

  public async getPersonalInfo(locale: string): Promise<PersonalInfo> {
    const personalInfo: PersonalInfo = await this.readFileForLocale(
      "personal-info",
      locale
    );
    if (privacyMode) {
      personalInfo.phoneNumber.local = "";
      personalInfo.phoneNumber.intl = "";
    }
    return personalInfo;
  }

  public async getJapaneseCvData(): Promise<JapaneseCvData> {
    const container = (await this.readFileForLocale(
      "cv-data",
      "ja-JP"
    )) as object;
    if (!Object.hasOwn(container, "japaneseOnly")) {
      throw new Error("Missing JP data section in JSON");
    }
    const japaneseCvData = (container as { japaneseOnly: JapaneseCvData })
      .japaneseOnly;
    if (privacyMode) {
      japaneseCvData.privacyMode = true;
      japaneseCvData.address.furigana = "〈非表示〉";
      japaneseCvData.address.postalCode = "〈非表示〉";
      japaneseCvData.address.text = "詳細情報につきましてはご連絡ください。";
      japaneseCvData.photoUrl = "";
    }
    return japaneseCvData;
  }

  private async readFileForLocale<T>(
    subPath: string,
    locale: string
  ): Promise<T> {
    const filePath = this.firstExtantFileOrNull([
      `${dataPath}/${subPath}.${locale}.json5`,
      `${dataPath}/${subPath}.${locale}.json`,
      `${dataPath}/${subPath}.${fallbackLocale}.json5`,
      `${dataPath}/${subPath}.${fallbackLocale}.json`,
    ]);
    if (!filePath) {
      throw new Error(`No data for ${subPath}`);
    }

    if (filePath.endsWith(".json")) {
      const buffer = fs.readFileSync(filePath);
      return JSON.parse(buffer.toString()) as T;
    }
    if (filePath.endsWith(".json5")) {
      const buffer = fs.readFileSync(filePath);
      return JSON5.parse(buffer.toString()) as T;
    }
    throw new Error(`File has an unhandled file extension: ${filePath}`);
  }

  private firstExtantFileOrNull(paths: string[]): string | null {
    for (const path of paths) {
      if (fs.existsSync(path)) return path;
      console.debug(`[DataService] File does not exist: ${path}`);
    }
    return null;
  }
})();
