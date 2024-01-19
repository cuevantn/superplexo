"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@superplexo/ui/dialog";

import { Input } from "@superplexo/ui/input";
import { Button } from "@superplexo/ui/button";
import { trpc } from "@/lib/trpc";
import { UserCombobox } from "@/components/user-combobox";
import { ProjectCombobox } from "@/components/project-combobox";
import { PlusIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

export const CreateTeam = () => {
  let [dialogOpen, setDialogOpen] = React.useState(false);

  let queryClient = useQueryClient();
  let listAllTeamsKey = getQueryKey(trpc.listAllTeams);

  let createTeam = trpc.createTeam.useMutation({
    onSuccess: () => {
      setDialogOpen(false);
      queryClient.invalidateQueries(listAllTeamsKey);
    },
  });

  let handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let form = event.target as HTMLFormElement;
    let formData = new FormData(form);
    let teamName = formData.get("teamName");
    if (!teamName) {
      // TODO: Toast error
      return;
    }

    let memberEmails = formData.get("Members");
    let projectSlugs = formData.get("Projects");

    createTeam.mutate({
      teamName: teamName.toString(),
      memberEmails: memberEmails
        ? memberEmails.toString().split(",")
        : undefined,
      projectSlugs: projectSlugs
        ? projectSlugs.toString().split(",")
        : undefined,
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="absolute top-0 right-0">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription>
            Create a new team to collaborate with your friends.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="teamName" placeholder="Team name" required />
          <div className="flex flex-row space-x-4">
            <UserCombobox placeholder="Members" multiple />
            <ProjectCombobox placeholder="Projects" multiple />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
