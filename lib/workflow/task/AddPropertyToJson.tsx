import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { DatabaseIcon, FileJsonIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const AddPropertyToJson = {
    type: TaskType.ADD_PROPERTY_TO_JSON,
    label: "Add property to JSON",
    icon: (props: LucideProps) => (
        <DatabaseIcon className="dark:stroke-white stroke-black" {...props} />
    ),
    isEntryPoint: false,
    credits: 1,
    inputs: [
        {
            name: "JSON",
            type: TaskParamsType.STRING,
            required: true,
          },
        {
            name: "Property name",
            type: TaskParamsType.STRING,
            required: true,
         },
        {
            name: "Property value",
            type: TaskParamsType.STRING,
            required: true,
         },
    ] as const, 
    outputs: [
        {
            name: "Update JSON",
            type: TaskParamsType.STRING,
        },
 
    ] as const
} satisfies WorkflowTask;
