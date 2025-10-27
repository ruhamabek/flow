import { WorkflowTask } from "../../../app/types/workflow"
import { ExtractTextFromElementTask } from "./ExtractTextFromElement"
import { LaunchBrowserTask } from "./LaunchBrowser"
import { PageToHtml } from "./PageToHtml"
import { TaskType } from "../../../app/types/task"
import { FillInput } from "./FillInput"
import { ClickElement } from "./ClickElement"
import { WaitForElement } from "./WaitForElement"
import { DeliverViaWebhook } from "./DeliverViaWebhook"
import { ExtractDataWithAI } from "./ExtractDataWithAI"
import { ReadPropertyFromJson } from "./ReadPropertyFromJson"
import { AddPropertyToJson } from "./AddPropertyToJson"
import { NavigateUrl } from "./NavigateUrl"
import { ScrollElement } from "./ScrollElement"

type Registry = {
    [K in TaskType]: WorkflowTask & {type: K};
}

const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHtml,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
    FILL_INPUT: FillInput,
    CLICK_ELEMENT: ClickElement,
    WAIT_FOR_ELEMENT: WaitForElement,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhook,
    EXTRACT_DATA_WITH_AI : ExtractDataWithAI,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJson,
    ADD_PROPERTY_TO_JSON: AddPropertyToJson,
    NAVIGATE_URL: NavigateUrl,
    SCROLL_ELEMENT: ScrollElement,

}

export default TaskRegistry