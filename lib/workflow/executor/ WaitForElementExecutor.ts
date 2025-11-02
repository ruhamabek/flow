import {  ExecutionEnviroment } from "@/app/types/executor";
import { WaitForElement } from "../task/WaitForElement";
 
export async function WaitForElementExecutor(
    enviroment: ExecutionEnviroment<typeof WaitForElement>,
):Promise<boolean> {
      try{
          const selector = enviroment.getInput("Selector");
          if(!selector){
            enviroment.log.error("input->selector not defined");
            return false;
          }

          const visibility = enviroment.getInput("Visibility");

          if(!visibility){
            enviroment.log.error("input->visibility not defined");
          }

         
          const state = visibility === "visible" ? "visible"
                        : visibility === "hidden" ? "hidden"
                        : undefined;

            const page = enviroment.getPage()!;
            await page.waitForSelector(selector, state ? { state } : {});
            enviroment.log.info(`Element ${selector} became: ${visibility}`)
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