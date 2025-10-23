import { TaskType } from "@/app/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { WorkflowTask } from "@/app/types/workflow";
import { ExecutionEnviroment } from "@/app/types/executor";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor} from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./ WaitForElementExecutor";
  
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
 }