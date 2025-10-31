import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { EyeIcon, LucideProps  } from "lucide-react";

export const WaitForElement = {
    type: TaskType.WAIT_FOR_ELEMENT,
    label: "Wait For Element",
    icon: (props: LucideProps) => (
        <EyeIcon className="dark:stroke-white stroke-black" {...props} />
    ),
    isEntryPoint: false,
    credits: 1,
    inputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
            required: true,
          },
        {
            name: "Selector",
            type: TaskParamsType.STRING,
            required: true,
         },
        {
            name: "Visibility",
            type: TaskParamsType.SELECT,
            hideHandle: true,
            required: true,
            options: [
                { label: "Visible" , value: "visible"},
                { label: "Hidden" , value: "hidden"}
            ],
         },
    ] as const, 
    outputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
        },
 
    ] as const
} satisfies WorkflowTask;
