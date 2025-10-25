import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { BrainIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const ExtractDataWithAI = {
    type: TaskType.EXTRACT_DATA_WITH_AI,
    label: "Extract data with AI",
    icon: (props: LucideProps) => (
        <BrainIcon className="dark:stroke-white stroke-black" {...props} />
    ),
    isEntryPoint: false,
    credits: 3,
    inputs: [
        {
            name: "Content",
            type: TaskParamsType.STRING,
            required: true,
          },
        {
            name: "Credentials",
            type: TaskParamsType.CREDENTIAL,
            required: true,
         },
        {
            name: "Prompt",
            type: TaskParamsType.STRING,
            required: true,
            variant: "textarea"
         },
    ] as const, 
    outputs: [
        {
            name: "Extracted data",
            type: TaskParamsType.STRING,
        },
 
    ] as const
} satisfies WorkflowTask;
