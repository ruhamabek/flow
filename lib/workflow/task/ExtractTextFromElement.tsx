import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElementTask = {
    type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
    label: "Extract text from element",
    icon: (props: LucideProps) => (
        <TextIcon className="dark:stroke-white stroke-black" {...props} />
    ),
    isEntryPoint: false,
    credits: 2,
    inputs: [
        {
            name: "Html",
            type: TaskParamsType.STRING,
            required: true,
            variant: "textarea"
         },
        {
            name: "Selector",
            type: TaskParamsType.STRING,
            required: true,
         },
    ],
    outputs: [
        {
            name: "Extracted text",
            type: TaskParamsType.STRING,
        },
 
    ]
} satisfies WorkflowTask;
