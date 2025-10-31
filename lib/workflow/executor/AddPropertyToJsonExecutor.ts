import {  ExecutionEnviroment } from "@/app/types/executor";
 import { AddPropertyToJson } from "../task/AddPropertyToJson";
 
export async function AddPropertyToJsonExecutor(
    enviroment: ExecutionEnviroment<typeof AddPropertyToJson>,
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

          const propertyValue = enviroment.getInput("Property value");
          if(!propertyValue){
            enviroment.log.error("input->propertyValue not defined");
          }

          const json = JSON.parse(jsonData);
          json[propertyName] = propertyValue;
          
          enviroment.setOutput("Update JSON" , JSON.stringify(json));
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