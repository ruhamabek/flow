import {  ExecutionEnviroment } from "@/app/types/executor";
import { PageToHtml } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
    enviroment: ExecutionEnviroment<typeof PageToHtml>,
):Promise<boolean> {
      try{
       const html = await enviroment.getPage()!.content();
       enviroment.setOutput("Html" , html);
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