import {  ExecutionEnviroment } from "@/app/types/executor";
import { NavigateUrl } from "../task/NavigateUrl";
 
export async function NavigateUrlExecutor(
    enviroment: ExecutionEnviroment<typeof NavigateUrl>,
):Promise<boolean> {
      try{
          const url = enviroment.getInput("URL");
          if(!url){
            enviroment.log.error("input->url not defined");
          }
            await enviroment.getPage()!.goto(url);
            enviroment.log.info(`visited ${url}`);
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