import { ExecutionEnviroment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { Kernel } from "@onkernel/sdk";
import { chromium } from "playwright-core";

export async function LaunchBrowserExecutor(
  enviroment: ExecutionEnviroment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  try {
    const apiKey = process.env.KERNEL_API_KEY;
    if (!apiKey) {
      throw new Error("KERNEL_API_KEY environment variable is not set");
    }

    const websiteUrl = enviroment.getInput("Website Url");

    const kernel = new Kernel({ apiKey });

    enviroment.log.info("Creating browser with CAPTCHA solver enabled...");

    const browserSession = await kernel.browsers.create({
      stealth: true,
      headless: false,
 
      persistence: { id: "captcha-enabled-browser" },
 
    });

    enviroment.log.info(`Browser Created: ${browserSession.session_id}`);
    enviroment.log.info(`Live View: ${browserSession.browser_live_view_url}`);

    const browser = await chromium.connectOverCDP(browserSession.cdp_ws_url);
    const context = browser.contexts()[0] || (await browser.newContext());
    const page = context.pages()[0] || (await context.newPage());

    await page.goto(websiteUrl, { waitUntil: "domcontentloaded" });
    enviroment.log.info(`Opened page at: ${websiteUrl}`);

     enviroment.setBrowser(browser as any);
    enviroment.setPage(page);
    (enviroment as any).kernelSessionId = browserSession.session_id;

   

    return true;
  } catch (error) {
    enviroment.log.error(
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}
