import type {
  CvData,
  JapaneseCvData,
  PersonalInfo,
  Project,
  TechnologyWithIcon,
} from "@shared/data.model";
import axios from "axios";
import {
  computed,
  type ComputedRef,
  type Ref,
  ref,
  watch,
  type WritableComputedRef,
} from "vue";
import LocaleService from "@/services/locale.service";

type CacheContainer = {
  cvData?: string;
  projects?: string;
  personalInfo?: string;
  japaneseCvData?: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default new (class DataService {
  private readonly cache: {
    personalInfo: Ref<PersonalInfo>;
    cvData: Ref<CvData>;
    projects: Ref<Project[]>;
    fullName: ComputedRef<string>;
    japaneseCvData: Ref<JapaneseCvData>;
  } = this.getDefaults();

  private getDefaults() {
    return {
      cvData: ref<CvData>({
        abstract: "",
        articles: [],
        lastModified: "",
      }),
      projects: ref<Project[]>([]),
      personalInfo: ref<PersonalInfo>({
        cvUrl: { full: "", short: "" },
        emailAddress: "",
        fullName: "",
        fullNameRuby: "",
        github: { url: "", username: "" },
        linkedIn: { url: "" },
        location: { lines: [], url: "" },
        longerTagLine: "",
        phoneNumber: { intl: "", local: "" },
        tagLine: "",
        dateOfBirth: "",
      }),
      fullName: computed(() => this.cache.personalInfo.value?.fullName ?? ""),
      japaneseCvData: ref<JapaneseCvData>({
        employmentSummary: [],
        educationSummary: [],
        qualificationSummary: [],
        address: {
          furigana: "",
          text: "",
          postalCode: "",
        },
        reasonsForApplying: "",
        personalPreferences: "",
        privacyMode: false,
        photoUrl: "/logo.svg",
      }),
    };
  }

  constructor() {}

  public initializeWatches() {
    const locale = LocaleService.getCurrentLocale();
    watch(
      locale,
      async () => {
        await Promise.all([
          this.fetchAndCache("cvData", "/cv/data", locale),
          this.fetchAndCache("projects", "/cv/projects", locale),
          this.fetchAndCache("personalInfo", "/cv/personal-info", locale),
          this.fetchAndCache("japaneseCvData", "/cv/ja", locale),
        ]);
      },
      { immediate: true }
    );
  }

  public getCvData(): Ref<CvData> {
    return this.cache.cvData;
  }

  public getProjects(): Ref<Project[]> {
    return this.cache.projects;
  }

  public getProject(id: string): Ref<Project | undefined> {
    return computed(() => {
      const projects = this.getProjects().value;
      if (!projects.find) {
        return undefined;
      }
      return projects.find((p) => p.id === id);
    });
  }

  public getPersonalInfo(): Ref<PersonalInfo> {
    return this.cache.personalInfo;
  }

  public getFullName(): Ref<string> {
    return this.cache.fullName;
  }

  public getTechnologies(): TechnologyWithIcon[] {
    return [
      { id: "angular", name: "Angular", logoUrl: "/tech-logos/angular.svg" },
      { id: "vue", name: "Vue.js", logoUrl: "/tech-logos/vue.svg" },
      {
        id: "javascript",
        name: "JavaScript",
        logoUrl: "/tech-logos/javascript.svg",
      },
      {
        id: "typescript",
        name: "TypeScript",
        logoUrl: "/tech-logos/typescript.svg",
      },
      { id: "rxjs", name: "RxJS", logoUrl: "/tech-logos/rxjs.svg" },
      { id: "ngrx", name: "NgRx", logoUrl: "/tech-logos/ngrx.svg" },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        logoUrl: "/tech-logos/tailwind.svg",
      },
      { id: "primeng", name: "PrimeFaces", logoUrl: "/tech-logos/primeng.svg" },
      { id: "kotlin", name: "Kotlin", logoUrl: "/tech-logos/kotlin.svg" },
      { id: "java", name: "Java", logoUrl: "/tech-logos/java.svg" },
      { id: "python", name: "Python", logoUrl: "/tech-logos/python.svg" },
      { id: "csharp", name: "C#", logoUrl: "/tech-logos/csharp.svg" },
      { id: "netcore", name: ".NET Core", logoUrl: "/tech-logos/netcore.svg" },
      { id: "spring", name: "Spring", logoUrl: "/tech-logos/spring.svg" },
      { id: "swagger", name: "Swagger", logoUrl: "/tech-logos/swagger.svg" },
      { id: "xunit", name: "xUnit", logoUrl: "/tech-logos/xunit.svg" },
      {
        id: "aws",
        name: "Amazon Web Services",
        logoUrl: "/tech-logos/aws.svg",
      },
      {
        id: "azure",
        name: "Microsoft Azure",
        logoUrl: "/tech-logos/azure.svg",
      },
      { id: "linux", name: "Linux", logoUrl: "/tech-logos/linux.svg" },
      {
        id: "windows-server",
        name: "Windows Server",
        logoUrl: "/tech-logos/windows-server.svg",
      },
      { id: "docker", name: "Docker", logoUrl: "/tech-logos/docker.svg" },
      {
        id: "postgresql",
        name: "PostgreSQL",
        logoUrl: "/tech-logos/postgresql.svg",
      },
      {
        id: "portainer",
        name: "Portainer",
        logoUrl: "/tech-logos/portainer.svg",
      },
      { id: "proxmox", name: "Proxmox", logoUrl: "/tech-logos/proxmox.png" },
      { id: "react", name: "React", logoUrl: "/tech-logos/react.svg" },
      { id: "bamboo", name: "Bamboo", logoUrl: "/tech-logos/bamboo.svg" },
      { id: "teamcity", name: "TeamCity", logoUrl: "/tech-logos/teamcity.svg" },
      { id: "jenkins", name: "Jenkins", logoUrl: "/tech-logos/jenkins.svg" },
      {
        id: "backstopjs",
        name: "BackstopJS",
        logoUrl: "/tech-logos/backstopjs.png",
      },
      { id: "node", name: "Node.js", logoUrl: "/tech-logos/node.svg" },
      {
        id: "puppeteer",
        name: "Puppeteer",
        logoUrl: "/tech-logos/puppeteer.svg",
      },
      {
        id: "mssql",
        name: "Microsoft SQL Server",
        logoUrl: "/tech-logos/mssql.svg",
      },
      { id: "bash", name: "Bash", logoUrl: "/tech-logos/bash.svg" },
      { id: "powershell", name: "PowerShell", logoUrl: "/tech-logos/pwsh.svg" },
      { id: "cypress", name: "Cypress", logoUrl: "/tech-logos/cypress.svg" },
      { id: "sass", name: "Sass", logoUrl: "/tech-logos/sass.svg" },
      { id: "mobx", name: "MobX", logoUrl: "/tech-logos/mobx.svg" },
      {
        id: "thymeleaf",
        name: "Thymeleaf",
        logoUrl: "/tech-logos/thymeleaf.svg",
      },
      { id: "selenium", name: "Selenium", logoUrl: "/tech-logos/selenium.svg" },
      { id: "chai", name: "Chai.js", logoUrl: "/tech-logos/chai.svg" },
      { id: "mocha", name: "Mocha", logoUrl: "/tech-logos/mocha.svg" },
    ];
  }

  public getTechnologiesById(ids: string[]): TechnologyWithIcon[] {
    if (!ids.length) {
      return [];
    }
    const technologies = this.getTechnologies();
    const filtered = [];
    for (const id of ids) {
      const tech = technologies.find((x) => x.id === id);
      if (!tech) {
        console.warn(`No technology with id '${id}'`);
        continue;
      }
      filtered.push(tech);
    }
    return filtered;
  }

  public getJapaneseCvData(): Ref<JapaneseCvData> {
    return this.cache.japaneseCvData;
  }

  private readonly httpClient = axios.create({
    baseURL: apiUrl,
  });

  private readonly cacheForLocale: CacheContainer = {};

  private async fetchAndCache<T>(
    key: keyof CacheContainer,
    url: string,
    localeRef: WritableComputedRef<string>
  ): Promise<Ref<T>> {
    const locale = localeRef.value;
    if (this.cacheForLocale[key] === locale) {
      return this.cache[key] as Ref<T>;
    }

    this.setIntermediateValue(key, this.getDefaults()[key]);

    const response = await this.httpClient.get(`${url}?locale=${locale}`);
    this.cacheForLocale[key] = locale;
    this.cache[key].value = response.data as any;
    return this.cache[key] as Ref<T>;
  }

  private setIntermediateValue<T>(key: keyof CacheContainer, value: T) {
    this.cache[key].value = value as any;
  }
})();
