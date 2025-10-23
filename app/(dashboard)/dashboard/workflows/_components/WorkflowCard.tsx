"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WorkflowExecutionStatus, WorkflowStatus } from "../../../../types/workflow";
import { Workflow } from "@prisma/client";
import {
  IconCashEdit,
  IconFile,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useState } from "react";
import {
  ChevronRightIcon,
  ClockIcon,
  CoinsIcon,
  CornerDownRightIcon,
  MoreVertical,
  MoveRightIcon,
} from "lucide-react";
import TooltipWrapper from "@/components/TooltipWrapper";
import DeleteWorkflowsDialog from "./DeleteWorkflowsDialog";
import RunBtn from "./RunBtn";
import SchedulerDialog from "./SchedulerDialog";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import { formatInTimeZone} from "date-fns-tz";
import ExecutionStatusIndicator, { ExecutionStatusLabel } from "@/app/workflow/runs/[workflowId]/[executionId]/_components/ExecutionStatusIndicator";
import DuplicateWorkflowDialog from "./DuplicateWorkflowDialog";

const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-secondary text-white",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card
      className="border border-separate shadow-sm rounded-lg overflow-hidden
          hover:shadow-md dark:shadow-primary/30 group/card"
    >
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              statusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <IconFile className="h-5 w-5 text-black dark:text-white" />
            ) : (
              <IconPlayerPlay className="h-5 w-5 text-white dark:text-gray-900" />
            )}
          </div>

          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <TooltipWrapper content={workflow.description}>
                     <Link
                href={`/workflow/editor/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              </TooltipWrapper>       
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-sm font-medium bg-black dark:bg-white dark:text-black text-white rounded-full">
                  Draft
                </span>
              )}

              <DuplicateWorkflowDialog workflowId={workflow.id}/>
            </h3>
            <ScheduleSection
              isDraft={isDraft}
              creditscost={workflow.creditscost ?? 0}
              workflowId={workflow.id}
              cron={workflow.cron}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDraft && <RunBtn workflowId={workflow.id} />}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <IconCashEdit size={16} />
            Edit
          </Link>
          <WorkflowAction
            workflowName={workflow.name}
            workflowId={workflow.id}
          />
        </div>
      </CardContent>
      <LastRunDetails workflow={workflow} />
    </Card>
  );
};

function WorkflowAction({
  workflowName,
  workflowId,
}: {
  workflowId: string;
  workflowName: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeleteWorkflowsDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"} variant={"outline"}>
            <TooltipWrapper content={"More actions"} side="bottom">
              <div className="flex items-center justify-center w-full h-full">
                <MoreVertical size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <IconTrash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function ScheduleSection({
  isDraft,
  creditscost,
  workflowId,
  cron,
}: {
  isDraft: boolean;
  creditscost: number;
  workflowId: string;
  cron: string | null;
}) {
  if (isDraft) return null;

  return (
    <div className="flex items-center gap-2">
      <CornerDownRightIcon className="h-4 w-4 text-muted-foreground" />
      <SchedulerDialog
        workflowId={workflowId}
        cron={cron}
        key={`${cron}-${workflowId}`}
      />
      <MoveRightIcon className="h-4 w-4 text-muted-foreground" />
      <TooltipWrapper content="Credit consumption for full run">
        <div className="flex items-center">
          <Badge
            variant={"outline"}
            className="space-x-2 text-muted-foreground rounded-sm"
          >
            <CoinsIcon className="h-4 w-4" />
            <span className="text-sm">{creditscost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
}

function LastRunDetails({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  if (isDraft) {
    return null;
  }
  const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;
  const formattedStartedAt =
    lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });
  const nextSchedule = nextRunAt && format(nextRunAt , "yyyy-MM-dd HH:mm");
  const nextScheduleUTC = nextRunAt && formatInTimeZone(nextRunAt , "UTC", "HH:mm");
  return (
    <>
      <div className="border-t border-border px-4 flex items-center text-muted-foreground bg-muted/20 py-1">
        {lastRunAt ? (
          <Link
            href={`/workflow/runs/${workflow.id}/${lastRunId}`}
            className="flex items-center gap-2 group hover:text-foreground transition-colors text-sm w-full -mb-6"
          >
            <span>Last run:</span>
            <ExecutionStatusIndicator
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <ExecutionStatusLabel
              status={lastRunStatus as WorkflowExecutionStatus}
            />
              <span>{formattedStartedAt}</span>
            <ChevronRightIcon
              size={14}
              className="-translate-x-[2px] group-hover:translate-x-0 transition-transform duration-200"
            />
          </Link>
        ) : (
          <p className="-mb-6">No runs yet</p>
        )}
      </div>

      {nextRunAt && (
        <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
          <ClockIcon size={12} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>
          <span>{nextScheduleUTC} UTC</span>
        </div>
      )}
    </>
  );
}

export default WorkflowCard;
