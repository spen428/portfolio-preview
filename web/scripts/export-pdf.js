import fs from "fs";
import puppeteer from "puppeteer";

async function pageToPdf(page, url, filename, browser) {
  console.log("Visiting " + url);
  await page.goto(url, { waitUntil: "networkidle0" });
  console.log("Waiting for loading spinners to disappear");
  await page.waitForFunction(() => !document.querySelector("#skeleton"));
  console.log("Loading has finished");

  if (!fs.existsSync("./bin")) {
    fs.mkdirSync("./bin");
  }
  const path = `./bin/${filename}.pdf`;
  await page.pdf({
    format: "A4",
    path,
    margin: { top: "10mm", left: "10mm", bottom: "10mm", right: "10mm" },
  });
  await browser.close();

  const fileSizeBytes = fs.statSync(path).size;
  if (fileSizeBytes < 51200) {
    throw new Error("PDF is smaller than 50 kB which indicates a failure.");
  }

  console.log("Exported PDF to " + path);
}

async function exportPdf(url, filename) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await pageToPdf(page, url, filename, browser);
}

// eslint-disable-next-line no-undef
const args = process.argv.slice(2);
const urlArg = args.find((arg) => arg.startsWith("--url="));
const url = urlArg ? urlArg.split("=")[1] : null;
if (!url) {
  throw new Error("--url=<base_url> argument is required but was not found");
}

(async () => {
  await exportPdf(`${url}/cv`, "CV");
  await exportPdf(`${url}/test/breakpoints`, "breakpoints");
})();
