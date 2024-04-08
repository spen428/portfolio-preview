export interface CvData {
  articles: Article[];
  abstract: string;
  lastModified: string;
}

export type DateDisplayType =
  | "dateRange"
  | "startDate"
  | "duration"
  | "dateRangeAndDuration"
  | "startDateAndDuration"
  | "hidden";

interface Article {
  title: string;
  sections: Section[];
  sectionDateDisplay: DateDisplayType;
}

interface Section {
  title: string;
  subtitle?: string;
  dateRange?: { from: string; to: string };
  htmlContent: string;
}

export interface Project {
  id: string;
  type: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  technologyIds?: string[];
  abstract?: string;
  learningObjectives?: string[];
  learningOutcomes?: string[];
  articleBody?: string;
  articleLastModified?: string;
}

export interface PersonalInfo {
  phoneNumber: { intl: string; local: string };
  emailAddress: string;
  cvUrl: { full: string; short: string };
  location: {
    url: string;
    lines: string[];
  };
  fullName: string;
  fullNameRuby: string;
  tagLine: string;
  github: { url: string; username: string };
  longerTagLine: string;
  linkedIn: { url: string };
  dateOfBirth: string;
}

export interface TechnologyWithIcon {
  id: string;
  name: string;
  logoUrl: string;
  color?: string;
}

export interface JapaneseCvData {
  privacyMode: boolean;
  photoUrl: string;
  reasonsForApplying: string;
  personalPreferences: string;
  address: { furigana: string; postalCode: string; text: string };
  employmentSummary: { year: number; month: number; text: string }[];
  educationSummary: { year: number; month: number; text: string }[];
  qualificationSummary: { year: number; month: number; text: string }[];
}
