import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { FileJsonIcon, LucideProps  } from "lucide-react";

export const ReadPropertyFromJson = {
    type: TaskType.READ_PROPERTY_FROM_JSON,
    label: "Read property from JSON",
    icon: (props: LucideProps) => (
        <FileJsonIcon className="dark:stroke-white stroke-black" {...props} />
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
    ] as const, 
    outputs: [
        {
            name: "Property value",
            type: TaskParamsType.STRING,
        },
 
    ] as const
} satisfies WorkflowTask;
