"use client";

import { updateUserSchema } from "@/lib/validation";
import { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Button from "../ui/button";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEditModalStore } from "@/hooks/use-edit-modal";

interface Props {
  user: IUser;
}

const EditForm = ({ user }: Props) => {
  const router = useRouter();
  const editModal = useEditModalStore();

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      location: user?.location || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    try {
      await axios.put(`/api/users/${user?._id}?type=updateFields`, values);
      router.refresh();
      toast({
        title: "Success",
        description: "User updated successfully",
      });

      editModal.onClose();
    } catch (error: any) {
      console.log(error);

      if (error.response?.data?.message) {
        toast({
          title: "Error",
          description: error.response?.data?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative -top-8 mx-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Location" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Bio" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          large
          fullWidth
          secondary
          label="Save"
        />
      </form>
    </Form>
  );
};

export default EditForm;
