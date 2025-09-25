import { useContext } from "react";
import { FlowValidationContext } from "../context/FlowValidationContext";

export default function useflowValidation(){
    const context = useContext(FlowValidationContext);
    if(!context){
        throw new Error("useFlowValidation must be in the  flow validation.")
    }
    return context;
}