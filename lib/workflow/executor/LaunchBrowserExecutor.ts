import { ExecutionEnviroment } from "@/app/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import chromium from "chrome-aws-lambda"; // serverless Chromium

export async function LaunchBrowserExecutor(
  enviroment: ExecutionEnviroment<typeof LaunchBrowserTask>
): Promise<boolean> {
  let browser = null;

  try {
    const websiteUrl = enviroment.getInput("Website Url");

    // Launch browser using chrome-aws-lambda
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
     });

    enviroment.log.info("Browser launched successfully");
    enviroment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl, { waitUntil: "networkidle2" });
    enviroment.setPage(page);
    enviroment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error) {
    enviroment.log.error(error instanceof Error ? error.message : String(error));
    return false;
  } 
}
