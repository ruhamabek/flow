import { FlowToExecutionPlan, FlowToExecutionPlanValidationError } from "@/lib/workflow/executionPlan";
 import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react";
import useflowValidation from "./useFlowValidation";
import { toast } from "sonner";
import { AppNode } from "@/app/types/appNode";

const useExecutionPlan = () =>{
    const {toObject} = useReactFlow();
    const{ setInvalidInputs , clearErrors}= useflowValidation();
    
    const handleError = useCallback((error: any) => {
               switch(error.type){
                    case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
                       toast.error("No entry point found in the workflow. Please add an entry point.");
                       break;
                    case FlowToExecutionPlanValidationError.INVALID_INPUTS:
                        toast.error("Some nodes have invalid or missing inputs");
                        setInvalidInputs(error.invalidElements!);
                        break;
                    default:
                        toast.error("An unknown error occurred while generating the execution plan.");
                        break;
               }
    } ,[setInvalidInputs]);

    const generateExecutionPlan = useCallback(() => {
        const {nodes, edges} = toObject();
        const { executionPlan , error} = FlowToExecutionPlan(nodes as AppNode[], edges);

        if(error){
            handleError(error);
            return null;
        }
        clearErrors();

        return executionPlan;
    },[toObject , handleError , clearErrors]);
    
    return generateExecutionPlan;
};

export default useExecutionPlan;