import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch browser",
    icon: (props: LucideProps) => (
        <GlobeIcon className="stroke-black" {...props} />
    ),
    isEntryPoint: true,
    credits: 5,
    inputs: [
        {
            name: "Website Url",
            type: TaskParamsType.STRING,
            helperText: "eg. https://www.google.com",
            required: true,
            hideHandle: true,
        }
    ] as const,
    outputs:[{name: "Web Page" , type: TaskParamsType.BROWSER_INSTANCE}] as const
} satisfies WorkflowTask;
