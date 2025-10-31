import { TaskParamsType, TaskType } from "../../../app/types/task";
import { WorkflowTask } from "../../../app/types/workflow";
import { LucideProps,  SendIcon } from "lucide-react";

export const DeliverViaWebhook = {
    type: TaskType.DELIVER_VIA_WEBHOOK,
    label: "Deliver via Webhook",
    icon: (props: LucideProps) => (
        <SendIcon className="dark:stroke-white stroke-black" {...props} />
    ),
    isEntryPoint: false,
    credits: 1,
    inputs: [
        {
            name: "Target URL",
            type: TaskParamsType.STRING,
            required: true,
          },
        {
            name: "Body",
            type: TaskParamsType.STRING,
            required: true,
         },
    ] as const, 
    outputs: [] as const
} satisfies WorkflowTask;
