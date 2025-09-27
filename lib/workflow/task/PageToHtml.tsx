import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { CodeIcon, GlobeIcon, LucideProps } from "lucide-react";

export const PageToHtml = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get html from page",
    icon: (props: LucideProps) => (
        <CodeIcon className="dark:stroke-white stroke-black" {...props} />
    ),
    isEntryPoint: false,
    credits: 2,
    inputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
            required: true,
         }
    ] as const,
    outputs: [
        {
            name: "Html",
            type: TaskParamsType.STRING,
        },
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
        }
    ] as const
} satisfies WorkflowTask;
