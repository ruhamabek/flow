// executor for launching browser: LaunchBrowserExecutor.ts
import { ExecutionEnviroment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function LaunchBrowserExecutor(
    enviroment: ExecutionEnviroment<typeof LaunchBrowserTask>,
): Promise<boolean> {
    const viewport = {
  deviceScaleFactor: 1,
  hasTouch: false,
  height: 1080,
  isLandscape: true,
  isMobile: false,
  width: 1920,
}

    try {
        const websiteUrl = enviroment.getInput("Website Url");

         const browser = await puppeteer.launch({
            headless: true,
            args: chromium.args,
            defaultViewport: viewport,
            executablePath: await chromium.executablePath(),
        });

        enviroment.log.info("Browser launched successfully");
        enviroment.setBrowser(browser);

        const page = await browser.newPage();
        await page.goto(websiteUrl);
        enviroment.setPage(page);
        enviroment.log.info(`Opened page at: ${websiteUrl}`);
        return true;
    } catch (error) {
        if (error instanceof Error) {
            enviroment.log.error(error.message);
        } else {
            enviroment.log.error(String(error));
        }
        return false;
    }
}
