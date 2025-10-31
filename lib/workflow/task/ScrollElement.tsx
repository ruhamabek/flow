import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { ArrowUpIcon, LucideProps  } from "lucide-react";

export const ScrollElement = {
    type: TaskType.SCROLL_ELEMENT,
    label: "Scroll element",
    icon: (props: LucideProps) => (
        <ArrowUpIcon className="dark:stroke-white stroke-black" {...props} />
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
    ] as const, 
    outputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
        },
 
    ] as const
} satisfies WorkflowTask;
