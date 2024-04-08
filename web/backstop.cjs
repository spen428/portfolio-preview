const fs = require("fs");
const path = require("node:path");

const vrRootPath = path.resolve(__dirname, "visual_regressions");

function getPdfScenarios() {
  const baseUri = "./visual_regressions/pdf_test/png";
  const files = fs.readdirSync(baseUri).filter((f) => f.endsWith(".png"));
  return files.map((file) => ({
    label: file,
    url: `${baseUri}/${file}`,
    viewports: [
      {
        label: "pdf",
        width: 1920,
        height: 1080,
      },
    ],
  }));
}

const baseUrl = process.env.BASE_URL ?? "http://localhost:5173";

const deviceViewports = [
  {
    label: "desktop",
    width: 1920,
    height: 1080,
  },
  {
    label: "desktop-half",
    width: 960,
    height: 1080,
  },
  {
    label: "tablet",
    width: 768,
    height: 1024,
  },
  {
    label: "phone",
    width: 390,
    height: 844,
  },
];

function getDeviceScenarios() {
  const scenarios = [
    {
      label: "Viewing index page",
      url: "/",
    },
    {
      label: "Viewing breakpoints test",
      url: "/test/breakpoints",
    },
    {
      label: "Viewing portfolio landing page",
      url: "/portfolio",
    },
    {
      label: "Viewing projects page",
      url: "/portfolio/projects",
      misMatchThreshold: 0.1,
    },
    {
      label: "Viewing CV",
      url: "/portfolio/cv",
    },
    {
      label: "Viewing CV Japanese format",
      url: "/portfolio/cv/jp",
    },
    {
      label: "Viewing business card",
      url: "/portfolio/business-card",
    },
  ];

  const deviceScenarios = deviceViewports.flatMap((viewport) =>
    scenarios.map((scenario) => ({
      label: `${scenario.label} with device (${viewport.label})`,
      viewports: [viewport],
      url: `${baseUrl}${scenario.url}?disableAnimation=1`,
      misMatchThreshold: scenario.misMatchThreshold,
      onReadyScript: "waitForLoading.cjs",
    }))
  );

  const japaneseLocaleScenarios = deviceScenarios.map((scenario) => ({
    ...scenario,
    label: `${scenario.label} in ja-JP`,
    onBeforeScript: "setLocale.ja-JP.cjs",
  }));

  return deviceScenarios.concat(japaneseLocaleScenarios);
}
// TODO: Add README tests
module.exports = {
  id: "VR",
  viewports: [],
  scenarios: getDeviceScenarios().concat(getPdfScenarios()),
  paths: {
    bitmaps_reference: `${vrRootPath}/bitmaps_reference`,
    bitmaps_test: `${vrRootPath}/bitmaps_test`,
    html_report: `${vrRootPath}/html_report`,
    engine_scripts: `${vrRootPath}/engine_scripts`,
    ci_report: `${vrRootPath}/ci_report`,
  },
  report: ["browser", "CI"],
  engine: "puppeteer",
  engineOptions: {
    args: ["--no-sandbox"],
    headless: "new",
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
  misMatchThreshold: 0.5,
};
