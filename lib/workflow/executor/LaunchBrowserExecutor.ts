import { ExecutionEnviroment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import chromium from "chrome-aws-lambda";
import type { Browser, Page } from "puppeteer-core";

export async function LaunchBrowserExecutor(
  enviroment: ExecutionEnviroment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = enviroment.getInput("Website Url");

    const browser: Browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    enviroment.setBrowser(browser);
    enviroment.log.info("Browser launched successfully");

    const page: Page = await browser.newPage();
    await page.goto(websiteUrl);
    enviroment.setPage(page);
    enviroment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error) {
    enviroment.log.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}
