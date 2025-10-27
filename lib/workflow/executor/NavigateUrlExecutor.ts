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

      }catch(error: any){
          enviroment.log.error(error.message)
          return false;
      }
}