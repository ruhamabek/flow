import { TaskType } from "@/app/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { WorkflowTask } from "@/app/types/workflow";
import { ExecutionEnviroment } from "@/app/types/executor";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor} from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./ WaitForElementExecutor";
import { DeliverViaWebhookExecutor } from "./DeliverViaWebhookExecutor";
import { ExtractElementWithAiExecutor } from "./ExtractElementWithAiExecutor";
import { ReadPropertyFromJsonExecutor } from "./ReadPropertyFromJsonExecutor";
import { AddPropertyToJsonExecutor } from "./AddPropertyToJsonExecutor";
 import { NavigateUrlExecutor } from "./NavigateUrlExecutor";
import { ScrollElementExecutor } from "./ScrollElementExecutor";
   
type ExecutorFn<T extends WorkflowTask> = (enviroment: ExecutionEnviroment<T>) => Promise<boolean>;

type RegistryType = {
    [K in TaskType]: ExecutorFn<WorkflowTask & {type: K}>;
}

export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor, 
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor, 
    FILL_INPUT: FillInputExecutor,
    CLICK_ELEMENT: ClickElementExecutor,
    WAIT_FOR_ELEMENT: WaitForElementExecutor,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
    EXTRACT_DATA_WITH_AI: ExtractElementWithAiExecutor,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor,
    ADD_PROPERTY_TO_JSON: AddPropertyToJsonExecutor,
    NAVIGATE_URL: NavigateUrlExecutor,
    SCROLL_ELEMENT: ScrollElementExecutor
 }