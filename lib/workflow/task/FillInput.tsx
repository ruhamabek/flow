import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { CodeIcon, Edit3Icon, LucideProps } from "lucide-react";

export const FillInput = {
    type: TaskType.FILL_INPUT,
    label: "Fill input",
    icon: (props: LucideProps) => (
        <Edit3Icon className="dark:stroke-white stroke-black" {...props} />
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
            name: "Value",
            type: TaskParamsType.STRING,
            required: true,
         },
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
        }
    ] as const
} satisfies WorkflowTask;
