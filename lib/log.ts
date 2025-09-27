import { Log, LogCollector, LogFunction, LogLevel, LogLevels } from "@/app/types/log";
  
export function createLogCollector(): LogCollector{
      const logs: Log[] = [];
      const getAll = () => logs;

    const logFuctions = {} as Record<LogLevel, LogFunction>;
    LogLevels.forEach((level) => {
      logFuctions[level] = (message: string) => {
        logs.push({ message, level, timestamp: new Date() });
      };
    });

    return {
        getAll,
        ...logFuctions,
    }
 }