import {  ExecutionEnviroment } from "@/app/types/executor";
 import { ClickElement } from "../task/ClickElement";
import { DeliverViaWebhook } from "../task/DeliverViaWebhook";
 
export async function DeliverViaWebhookExecutor(
    enviroment: ExecutionEnviroment<typeof DeliverViaWebhook>,
):Promise<boolean> {
      try{
          const targetUrl = enviroment.getInput("Target URL");
          if(!targetUrl){
            enviroment.log.error("input->targetUrl not defined");
          }
            
          const body = enviroment.getInput("Body");
          if(!body){
            enviroment.log.error("input->body not defined");
          }

          const response = await fetch(targetUrl , {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const statusCode = response.status;
          if(statusCode !== 200){
              enviroment.log.error(`status code: ${statusCode}`);
              return false;
          }
          
          const responseBody = await response.json();
          enviroment.log.info(JSON.stringify(responseBody , null ,4));
          return true;
      }catch(error: any){
          enviroment.log.error(error.message)
          return false;
      }
}