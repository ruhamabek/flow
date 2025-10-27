import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { Link2Icon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const NavigateUrl = {
    type: TaskType.NAVIGATE_URL,
    label: "Navigate url",
    icon: (props: LucideProps) => (
        <Link2Icon className="dark:stroke-white stroke-black" {...props} />
    ),
    isEntryPoint: false,
    credits: 2,
    inputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
            required: true,
          },
        {
            name: "URL",
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
