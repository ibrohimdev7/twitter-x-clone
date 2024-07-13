import React, { useCallback } from "react";

import { useRegisterModalStore } from "@/hooks/use-register-modal";
import Modal from "../ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerStepOneSchema, registerStepTwoSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import { useLoginModalStore } from "@/hooks/use-login-modal";

const RegisterStepOne = ({
  setData,
  setStep,
}: {
  setData: (data: { name: string; email: string }) => void;
  setStep: (step: number) => void;
}) => {
  const form = useForm<z.infer<typeof registerStepOneSchema>>({
    resolver: zodResolver(registerStepOneSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerStepOneSchema>) => {
    setData({ ...values });
    setStep(2);
  };

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <h3 className="text-3xl font-semibold text-white">Create an account</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button
          label="Next"
          type="submit"
          secondary
          fullWidth
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
};

const RegisterStepTwo = () => {
  const form = useForm<z.infer<typeof registerStepTwoSchema>>({
    resolver: zodResolver(registerStepTwoSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerStepTwoSchema>) => {
    console.log(values);
  };

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
          label="Register"
          type="submit"
          secondary
          fullWidth
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
};

const RegisterModal = () => {
  const [data, setData] = React.useState({
    email: "",
    name: "",
  });
  const [step, setStep] = React.useState(1);

  const registerModal = useRegisterModalStore();
  const loginModal = useLoginModalStore();

  const onToggleRegisterModal = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [registerModal, loginModal]);

  const bodyContent =
    step === 1 ? (
      <RegisterStepOne setData={setData} setStep={setStep} />
    ) : (
      <RegisterStepTwo />
    );

  const footer = (
    <div className="text-neutral-400 text-center mt-4 mb-4">
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggleRegisterModal}
        >
          Login
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={footer}
      step={step}
      totalSteps={2}
    />
  );
};

export default RegisterModal;
