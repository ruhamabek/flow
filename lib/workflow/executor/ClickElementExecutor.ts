import {  ExecutionEnviroment } from "@/app/types/executor";
 import { ClickElement } from "../task/ClickElement";
 
export async function ClickElementExecutor(
    enviroment: ExecutionEnviroment<typeof ClickElement>,
):Promise<boolean> {
      try{
          const selector = enviroment.getInput("Selector");
          if(!selector){
            enviroment.log.error("input->selector not defined");
          }
            await enviroment.getPage()!.click(selector);
            return true;

      }catch(error: any){
          enviroment.log.error(error.message)
          return false;
      }
}