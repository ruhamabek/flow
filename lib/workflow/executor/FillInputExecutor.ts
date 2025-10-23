import {  ExecutionEnviroment } from "@/app/types/executor";
 import { FillInput } from "../task/FillInput";
import { waitFor } from "@/lib/helper/waitFor";

export async function FillInputExecutor(
    enviroment: ExecutionEnviroment<typeof FillInput>,
):Promise<boolean> {
      try{
          const selector = enviroment.getInput("Selector");
          if(!selector){
            enviroment.log.error("input->selector not defined");
          }
          const value = enviroment.getInput("Value");
           if(!value){
                enviroment.log.error("input->value not defined");
            }
          
            await enviroment.getPage()!.type(selector, value);
            return true;

      }catch(error: any){
          enviroment.log.error(error.message)
          return false;
      }
}