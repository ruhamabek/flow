import { ExecutionEnviroment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

/* eslint-disable @typescript-eslint/no-explicit-any */

const CHROMIUM_PATH = process.env.CHROMIUM_PATH;

export async function LaunchBrowserExecutor(
  environment: ExecutionEnviroment<typeof LaunchBrowserTask>
): Promise<boolean> {
      const viewport = {
    deviceScaleFactor: 1,
    hasTouch: false,
    height: 1080,
    isLandscape: true,
    isMobile: false,
    width: 1920,
  };
  try {
    const websiteUrl = environment.getInput("Website Url");
    let browser: any;

    if (process.env.VERCEL_ENV === "production") {
       const chromium = (await import("@sparticuz/chromium-min")).default;
      const puppeteerCore = (await import("puppeteer-core")).default;

       const executablePath = await chromium.executablePath(CHROMIUM_PATH);

      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: viewport,
        executablePath,
        headless: true,
      });

      environment.log.info("Chromium (production) launched successfully");
    } else {
       const puppeteer = (await import("puppeteer")).default;
      browser = await puppeteer.launch({ headless: true });
      environment.log.info("Puppeteer (local) launched successfully");
    }

    environment.setBrowser(browser);

     const page = await browser.newPage();
    await page.goto(websiteUrl, { waitUntil: "domcontentloaded" });
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error) {
    environment.log.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}
