 import { ExecutionEnviroment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export async function LaunchBrowserExecutor(
  enviroment: ExecutionEnviroment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = enviroment.getInput("Website Url");

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    enviroment.log.info("Browser launched successfully");
    enviroment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl);
    enviroment.setPage(page);
    enviroment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error) {
    enviroment.log.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}
