"use client";
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconLayersIntersect } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import {
  createWorkflowSchema,
  createWorkflowtype,
} from "../../../../schema/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "../../../../../actions/workflows/createWorkflow";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomDialogHeader from "@/components/CustomDialogHeader";

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<createWorkflowtype>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow Created.", { id: "create-workflow" });
      setOpen(false);
      router.push(`/workflow/editor/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create workflow", {
        id: "create-workflow",
      });
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowtype) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={IconLayersIntersect}
          title="Create workflow"
          subTitle="Start building your workflow"
        />
        <DialogDescription className="sr-only">
          Start building your workflow by providing a name and description.
        </DialogDescription>
        <div className="p-6">
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name
                      <p className="text-xs text-muted-foreground">
                        (required)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Flow" {...field} />
                    </FormControl>
                    <FormDescription>Choose a Desciptive name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="eg. scrape shoe prices..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {!isPending && "Submit"}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
