import {  ExecutionEnviroment } from "@/app/types/executor";
import { PageToHtml } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
    enviroment: ExecutionEnviroment<typeof PageToHtml>,
):Promise<boolean> {
      try{
       const html = await enviroment.getPage()!.content();
       enviroment.setOutput("Html" , html);
       return true;
          
      }catch(error: any){
          enviroment.log.error(error.message)
          return false;
      }
}