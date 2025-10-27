import {  ExecutionEnviroment } from "@/app/types/executor";
import { ScrollElement } from "../task/ScrollElement";
 
export async function ScrollElementExecutor(
    enviroment: ExecutionEnviroment<typeof ScrollElement>,
):Promise<boolean> {
      try{
          const selector = enviroment.getInput("Selector");
          if(!selector){
            enviroment.log.error("input->selector not defined");
          }
            await enviroment.getPage()!.evaluate((selector) => {
                 const element = document.querySelector(selector);
                 if(!element){
                  throw new Error("Element not found");
                 }

                 const top = element.getBoundingClientRect().top + window.scrollY;
                 window.scrollTo({top})
            } , selector)
            return true;

      }catch(error: any){
          enviroment.log.error(error.message)
          return false;
      }
}