import { Browser, Page } from "puppeteer-core";  
import { WorkflowTask } from "./workflow";
import { LogCollector } from "./log";

export type Enviroment = {
  browser?: Browser | null;  
  page?: Page | null;
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type ExecutionEnviroment<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
  setOutput(name: T["outputs"][number]["name"], value: string): void;

  getBrowser(): Browser | null | undefined;
  setBrowser(browser: Browser): void;

  getPage(): Page | null | undefined;
  setPage(page: Page): void;

  log: LogCollector;
};
