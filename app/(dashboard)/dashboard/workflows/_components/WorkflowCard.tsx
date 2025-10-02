"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "../../../../types/workflow";
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
import { MoreVertical } from "lucide-react";
import TooltipWrapper from "@/components/TooltipWrapper";
import DeleteWorkflowsDialog from "./DeleteWorkflowsDialog";
import RunBtn from "./RunBtn";

const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-secondary text-white",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card
      className="border border-separate shadow-sm rounded-lg overflow-hidden
          hover:shadow-md dark:shadow-primary/30"
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
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-sm font-medium bg-black dark:bg-white dark:text-black  text-white  rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isDraft && <RunBtn workflowId={workflow.id}/>}
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

export default WorkflowCard;
