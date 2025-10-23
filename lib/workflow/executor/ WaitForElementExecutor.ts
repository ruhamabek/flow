import {  ExecutionEnviroment } from "@/app/types/executor";
import { WaitForElement } from "../task/WaitForElement";
 
export async function WaitForElementExecutor(
    enviroment: ExecutionEnviroment<typeof WaitForElement>,
):Promise<boolean> {
      try{
          const selector = enviroment.getInput("Selector");
          if(!selector){
            enviroment.log.error("input->selector not defined");
          }

          const visibility = enviroment.getInput("Visibility");

          if(!visibility){
            enviroment.log.error("input->visibility not defined");
          }
            await enviroment.getPage()!.waitForSelector(selector , {
              visible: visibility === "visible",
              hidden: visibility === "hidden"
            });
            enviroment.log.info(`Element ${selector} became: ${visibility}`)
            return true;

      }catch(error: any){
          enviroment.log.error(error.message)
          return false;
      }
}