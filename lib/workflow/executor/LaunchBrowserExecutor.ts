/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionEnviroment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

/**
 * LaunchBrowserExecutor
 * Works seamlessly on Vercel using @sparticuz/chromium + puppeteer-core.
 * Falls back to full Puppeteer in local development.
 */
export async function LaunchBrowserExecutor(
  environment: ExecutionEnviroment<typeof LaunchBrowserTask>
): Promise<boolean> {
  const websiteUrl = environment.getInput("Website Url")?.trim();

  if (!websiteUrl) {
    environment.log.error("Missing website URL input.");
    return false;
  }

  let browser: any;

  try {
    const isVercel = !!process.env.VERCEL_ENV;
    let puppeteer: any;
    let launchOptions: any = {
      headless: true,
    };

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium")).default;
      puppeteer = await import("puppeteer-core");
      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      };
    } else {
      puppeteer = await import("puppeteer");
    }

    browser = await puppeteer.launch(launchOptions);

    environment.setBrowser(browser);
    environment.log.info("✅ Browser launched successfully");

    const page = await browser.newPage();
    await page.goto(websiteUrl, { waitUntil: "networkidle2" });
    environment.setPage(page);
    environment.log.info(`🌐 Opened page at: ${websiteUrl}`);

    return true;
  } catch (error) {
    environment.log.error(
      error instanceof Error ? error.message : String(error)
    );
    return false;
  } finally {
    if (browser) {
      try {
        await browser.close();
        environment.log.info("🧹 Browser closed cleanly");
      } catch {
        environment.log.error("Could not close browser.");
      }
    }
  }
}
