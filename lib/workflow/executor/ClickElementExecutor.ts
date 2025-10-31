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

      } catch (error) {
          if (error instanceof Error) {
              enviroment.log.error(error.message);
          } else {
              enviroment.log.error(String(error));
          }
          return false;
      }
}