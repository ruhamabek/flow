import {  ExecutionEnviroment } from "@/app/types/executor";
 import { ReadPropertyFromJson } from "../task/ReadPropertyFromJson";
 
export async function ReadPropertyFromJsonExecutor(
    enviroment: ExecutionEnviroment<typeof ReadPropertyFromJson>,
):Promise<boolean> {
      try{
          const jsonData = enviroment.getInput("JSON");
          if(!jsonData){
            enviroment.log.error("input->jsonData not defined");
          }

          const propertyName = enviroment.getInput("Property name");
          if(!propertyName){
            enviroment.log.error("input->propertyName not defined");
          }

          const json = JSON.parse(jsonData);
          const propertyValue = json[propertyName];
          if(propertyValue === undefined){
            enviroment.log.error("property not found");
            return false;
          }  
          
          enviroment.setOutput("Property value" , propertyValue);
          return true;

      }catch(error: any){
          enviroment.log.error(error.message)
          return false;
      }
}