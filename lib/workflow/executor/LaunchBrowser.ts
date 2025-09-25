import { waitFor } from "@/lib/helper/waitFor";
import puppeteer from "puppeteer";

export async function LaunchBrowserExecutor():Promise<boolean> {
      try{
         const browser = await puppeteer.launch({
            executablePath: "/usr/bin/vivaldi",
            headless: false
          });

          await waitFor(3000);
          await browser.close();
          return true;
          
      }catch(error){
          console.error(error)
          return false;
      }
}