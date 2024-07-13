import React, { use, useCallback } from "react";

import { useLoginModalStore } from "@/hooks/use-login-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import { useRegisterModalStore } from "@/hooks/use-register-modal";

const LoginModal = () => {
  const useLoginStore = useLoginModalStore();
  const registerModal = useRegisterModalStore();

  const onToggleRegisterModal = useCallback(() => {
    useLoginStore.onClose();
    registerModal.onOpen();
  }, [registerModal, useLoginStore]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  const bodyContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          label="Login"
          type="submit"
          secondary
          fullWidth
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );

  const footer = (
    <div className="text-neutral-400 text-center mb-4">
      <p>
        First time using X?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggleRegisterModal}
        >
          {" "}
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={useLoginStore.isOpen}
      onClose={useLoginStore.onClose}
      body={bodyContent}
      footer={footer}
    />
  );
};

export default LoginModal;
