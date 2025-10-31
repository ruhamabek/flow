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
import {IconShieldBolt } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
 import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { createCredentialSchema, createCredentialType } from "@/app/schema/credential";
import { CreateCredential } from "@/actions/credentials/createCredential";

function CreateCredentialDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);
 
  const form = useForm<createCredentialType>({
    resolver: zodResolver(createCredentialSchema), 
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCredential,
    onSuccess: () => {
      toast.success("Credential Created.", { id: "create-credential" });
      form.reset();
      setOpen(false);
     },
    onError: (error) => {
      toast.error(error.message || "Failed to create credential", {
        id: "create-credential",
      });
    },
  });

  const onSubmit = useCallback(
    (values: createCredentialType) => {
      toast.loading("Creating credential...", { id: "create-credential" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={IconShieldBolt}
          title="Create credential"
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
                      <Input placeholder="eg. OpenAI" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a unque and descriptive name for the credential
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Value
                      <p className="text-xs text-muted-foreground">
                        (required)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                         {...field}
                      />
                    </FormControl>
                    <FormDescription>
                       Enter the value associated with this credential
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

export default CreateCredentialDialog;
