import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const ClickElement = {
    type: TaskType.CLICK_ELEMENT,
    label: "Click element",
    icon: (props: LucideProps) => (
        <MousePointerClick className="dark:stroke-white stroke-black" {...props} />
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
