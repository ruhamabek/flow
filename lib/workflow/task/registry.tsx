import { WorkflowTask } from "../../../app/types/workflow"
import { ExtractTextFromElementTask } from "./ExtractTextFromElement"
import { LaunchBrowserTask } from "./LaunchBrowser"
import { PageToHtml } from "./PageToHtml"
import { TaskType } from "../../../app/types/task"
import { FillInput } from "./FillInput"
import { ClickElement } from "./ClickElement"
import { WaitForElement } from "./WaitForElement"

type Registry = {
    [K in TaskType]: WorkflowTask & {type: K};
}

const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHtml,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
    FILL_INPUT: FillInput,
    CLICK_ELEMENT: ClickElement,
    WAIT_FOR_ELEMENT: WaitForElement
}

export default TaskRegistry