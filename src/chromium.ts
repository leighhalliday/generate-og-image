import chrome from "chrome-aws-lambda";
import { launch } from "puppeteer-core";

const exePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

async function getOptions(isDev: boolean) {
  let options: Options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    };
  }
  return options;
}

export async function getScreenshot(url: string, isDev: boolean) {
  const options = await getOptions(isDev);
  const browser = await launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(url);
  return page.screenshot({ type: "jpeg", quality: 100 });
}
